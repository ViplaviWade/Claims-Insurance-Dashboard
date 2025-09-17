# app/schemas/document.py
from datetime import datetime
from typing import Annotated, Optional
from pydantic import BaseModel, StringConstraints

# reusable constrained types
Str255 = Annotated[str, StringConstraints(min_length=1, max_length=255)]
ShortLabel = Annotated[str, StringConstraints(min_length=1, max_length=64)]

class ClaimDocumentCreate(BaseModel):
    claim_id: int
    filename: Str255        # <-- use ":" (type annotation), not "="
    label: str | None = None
    uploaded_at: datetime

    model_config = {"from_attributes": True}

class ClaimDocumentOut(ClaimDocumentCreate):
    id: int
    claim_id: int
    filename: str
    label: str | None = None
    uploaded_at: datetime

    model_config = {"from_attributes": True}

class PresignRequest(BaseModel):
    filename: str
    content_type: str

class DocMeta(BaseModel):
    filename: str
    label: str | None = None
    storage: str = "s3"
    key: str

class ClaimDocumentMetaIn(BaseModel):
    # what the frontend sends after the S3 PUT succeeds
    filename: str
    label: Optional[str] = None
    # allow these so the current frontend payload is accepted; we ignore them
    storage: Optional[str] = None   # e.g. "s3"
    key: Optional[str] = None       # e.g. object key in S3

    model_config = {"from_attributes": True}

class DocMeta(BaseModel):
    filename: str
    label: Optional[str] = None
    storage: Optional[str] = None
    key: Optional[str] = None

class ClaimDocumentOut(BaseModel):
    id: int
    claim_id: int
    filename: str
    label: str | None
    uploaded_at: datetime

    model_config = {"from_attributes": True}
