import os
from PIL import Image

brain_dir = "/Users/n1k0zy/.gemini/antigravity-ide/brain/fefc838c-b8ef-4b29-ab53-dfaff0eb021c"
assets_dir = "/Users/n1k0zy/Documents/GitHub/Portfolio2.0/src/assets"

# Based on visual inspection of the screenshots:
# media__1780140662501.png has: Amit (top), Soumendu (mid), Rishindra (bottom)
# media__1780140663077.png has: Anuja (top), Parshant (mid), Sabareesh (bottom)
# media__1780140663081.png has: Saswata (only visible avatar, near top-middle)

def find_avatar_regions(img, min_size=35, max_size=300):
    """Find circular avatar regions on the left side of a LinkedIn screenshot."""
    w, h = img.size
    rgb = img.convert('RGB')
    
    # Scan multiple columns on the left side to find avatars
    scan_range = range(int(w * 0.03), int(w * 0.10), 3)
    
    all_active = set()
    for x_scan in scan_range:
        for y in range(h):
            r, g, b = rgb.getpixel((x_scan, y))
            # Non-white/non-near-white pixel
            if r < 240 or g < 240 or b < 240:
                all_active.add(y)
    
    active_rows = sorted(all_active)
    if not active_rows:
        return []
    
    # Group contiguous rows
    regions = []
    start = active_rows[0]
    prev = active_rows[0]
    for y in active_rows[1:]:
        if y - prev > 15:
            regions.append((start, prev))
            start = y
        prev = y
    regions.append((start, prev))
    
    # Filter by avatar-like size
    avatar_regions = [(s, e) for s, e in regions if min_size < (e - s) < max_size]
    print(f"  Found {len(avatar_regions)} avatar regions: {avatar_regions}")
    return avatar_regions


def crop_avatar(img, y_start, y_end, name):
    """Crop a square region around the avatar."""
    w, h_img = img.size
    rgb = img.convert('RGB')
    height = y_end - y_start
    center_y = y_start + height // 2
    
    # Find horizontal extent of the avatar at center_y
    x_left = None
    x_right = None
    for x in range(0, int(w * 0.15)):
        r, g, b = rgb.getpixel((x, center_y))
        if r < 240 or g < 240 or b < 240:
            if x_left is None:
                x_left = x
            x_right = x
    
    if x_left is not None and x_right is not None:
        width = x_right - x_left
        center_x = x_left + width // 2
        box_size = max(height, width)
    else:
        center_x = int(w * 0.06)
        box_size = height
    
    # Add small padding
    pad = int(box_size * 0.1)
    left = max(0, center_x - box_size // 2 - pad)
    top = max(0, center_y - box_size // 2 - pad)
    right = min(w, center_x + box_size // 2 + pad)
    bottom = min(h_img, center_y + box_size // 2 + pad)
    
    cropped = img.crop((left, top, right, bottom))
    cropped = cropped.resize((150, 150), Image.Resampling.LANCZOS)
    
    out_path = os.path.join(assets_dir, f"avatar-{name}.png")
    cropped.save(out_path, "PNG")
    print(f"  Saved {name} -> {out_path}")


# Process each screenshot
configs = [
    ("media__1780140662501.png", ["amit", "soumendu", "rishindra"]),
    ("media__1780140663077.png", ["anuja", "parshant", "sabareesh"]),
    ("media__1780140663081.png", ["saswata"]),
]

for filename, names in configs:
    filepath = os.path.join(brain_dir, filename)
    if not os.path.exists(filepath):
        print(f"SKIP: {filename} not found")
        continue
    
    print(f"\nProcessing {filename}...")
    img = Image.open(filepath)
    regions = find_avatar_regions(img)
    regions.sort(key=lambda r: r[0])
    
    for i, name in enumerate(names):
        if i < len(regions):
            y_start, y_end = regions[i]
            crop_avatar(img, y_start, y_end, name)
        else:
            print(f"  WARNING: No region found for {name} (index {i})")

print("\nDone!")
