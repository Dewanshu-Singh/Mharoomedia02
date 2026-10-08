from PIL import Image

img_path = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\9bfd3985-d0f8-48b1-830f-05feea3aa3c4\.user_uploaded\media_1789722182521.png"
try:
    img = Image.open(img_path)
    img = img.convert("RGB")
    width, height = img.size
    r, g, b = img.getpixel((width // 2, height // 2))
    print(f"HEX: #{r:02x}{g:02x}{b:02x}")
except Exception as e:
    print(str(e))
