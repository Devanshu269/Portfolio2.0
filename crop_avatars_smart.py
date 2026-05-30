import os
import numpy as np
from PIL import Image, ImageOps

# Paths
brain_dir = "/Users/n1k0zy/.gemini/antigravity-ide/brain/fefc838c-b8ef-4b29-ab53-dfaff0eb021c"
assets_dir = "/Users/n1k0zy/Documents/GitHub/Portfolio2.0/src/assets"

screenshots = {
    "media__1780140663077.png": [
        ("amit", 0),      # Amit Kumar (top)
        ("soumendu", 1),  # Soumendu Das (middle)
        ("rishindra", 2)  # Rishindra Mani Katiyar (bottom)
    ],
    "media__1780140663081.png": [
        ("anuja", 0),     # Anuja Nayak (top)
        ("parshant", 1),  # Parshant Sharma (middle)
        ("sabareesh", 2)  # R D Sabareesh (bottom)
    ],
    "media__1780140662501.png": [
        ("saswata", 0)    # Saswata Rakshit (top/middle)
    ]
}

def find_circles_on_left(img):
    w, h = img.size
    rgb_img = img.convert('RGB')
    
    # We choose a column near the left edge to scan vertically (around 6% of width)
    x_scan = int(w * 0.06)
    if x_scan < 30:
        x_scan = 50
        
    print(f"Scanning column x={x_scan} for avatars...")
    
    active_rows = []
    for y in range(h):
        r, g, b = rgb_img.getpixel((x_scan, y))
        # LinkedIn background is white (255, 255, 255)
        # Any avatar pixel will be significantly different from white
        if r < 248 or g < 248 or b < 248:
            active_rows.append(y)
            
    if not active_rows:
        return []
        
    # Group contiguous rows
    regions = []
    start = active_rows[0]
    for i in range(1, len(active_rows)):
        if active_rows[i] - active_rows[i-1] > 30: # GAP threshold
            regions.append((start, active_rows[i-1]))
            start = active_rows[i]
    regions.append((start, active_rows[-1]))
    
    # Filter by size
    avatar_regions = []
    for s, e in regions:
        height = e - s
        # A profile avatar in a screenshot should be between 40px and 250px high
        if 40 < height < 250:
            avatar_regions.append((s, e))
            
    print(f"Detected {len(avatar_regions)} avatar regions: {avatar_regions}")
    return avatar_regions

os.makedirs(assets_dir, exist_ok=True)

for filename, roles in screenshots.items():
    filepath = os.path.join(brain_dir, filename)
    if not os.path.exists(filepath):
        print(f"Screenshot {filename} not found.")
        continue
        
    print(f"\nProcessing {filename}...")
    img = Image.open(filepath)
    regions = find_circles_on_left(img)
    
    # Sort top to bottom
    regions = sorted(regions, key=lambda x: x[0])
    
    rgb_img = img.convert('RGB')
    w, h = img.size
    
    for role_name, index in roles:
        if index >= len(regions):
            print(f"Could not find region for index {index} ({role_name}) in {filename}.")
            continue
            
        y_start, y_end = regions[index]
        height = y_end - y_start
        center_y = y_start + height // 2
        
        # Scan horizontally at center_y to find the bounds of the circle
        # Scan from x=10 to x=int(w * 0.2)
        left_edge = 10
        right_edge = int(w * 0.25)
        
        # Find first non-white pixel from left
        found_left = False
        for x in range(10, int(w * 0.25)):
            r, g, b = rgb_img.getpixel((x, center_y))
            if r < 248 or g < 248 or b < 248:
                left_edge = x
                found_left = True
                break
                
        # Find first non-white pixel from right
        found_right = False
        for x in range(int(w * 0.25), 10, -1):
            r, g, b = rgb_img.getpixel((x, center_y))
            if r < 248 or g < 248 or b < 248:
                right_edge = x
                found_right = True
                break
                
        if found_left and found_right:
            width = right_edge - left_edge
            center_x = left_edge + width // 2
            box_size = int(max(height, width) * 1.1)  # tiny extra padding
        else:
            center_x = int(w * 0.06)
            box_size = int(height * 1.1)
            
        left = max(0, center_x - box_size // 2)
        top = max(0, center_y - box_size // 2)
        right = min(w, left + box_size)
        bottom = min(h, top + box_size)
        
        # Crop square
        cropped = img.crop((left, top, right, bottom))
        
        # Resize to standard high-res avatar size (150x150) for perfect display
        cropped_resized = cropped.resize((150, 150), Image.Resampling.LANCZOS)
        
        out_path = os.path.join(assets_dir, f"avatar-{role_name}.png")
        cropped_resized.save(out_path, "PNG")
        print(f"Successfully saved {role_name} avatar to {out_path} (150x150)")
