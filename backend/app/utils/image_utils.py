from PIL import Image
import io

def read_image_from_upload(upload_file):
    """
    Convert FastAPI UploadFile into a PIL Image.
    This function centralizes image decoding logic.
    """
    image_bytes = upload_file.file.read()
    image = Image.open(io.BytesIO(image_bytes))
    
    # Reset pointer so other services (YOLO/Gemini) can reuse the file
    upload_file.file.seek(0)

    return image


def validate_image_format(upload_file):
    """
    Validate supported image formats.
    """
    allowed_types = ["image/jpeg", "image/png", "image/jpg"]

    if upload_file.content_type not in allowed_types:
        raise ValueError("Unsupported image format. Use JPG or PNG.")


def resize_image(image, max_size=(640, 640)):
    """
    Resize image while maintaining aspect ratio.
    Useful for performance optimization.
    """
    image.thumbnail(max_size)
    return image
