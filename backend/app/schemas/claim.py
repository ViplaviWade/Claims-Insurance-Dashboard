from datetime import datetime
from pydantic import BaseModel
from app.models.claim import ClaimStage

class ClaimCreate(BaseModel):
    policy_holder: str
    policy_number: str

class ClaimResponse(ClaimCreate):
    id: int
    policy_holder: str
    policy_number: str
    status: str
    stage: str  # or Literal[...] if you want to lock to enum values
    created_at: datetime
    updated_at: datetime | None

    model_config = {"from_attributes": True} 