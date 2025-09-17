# app/schemas/history.py
from datetime import datetime
from typing import Optional
from pydantic import constr
from .base import ORMBase

class ClaimHistoryOut(ORMBase):
    id: int
    claim_id: int
    from_stage = constr(min_length=1, max_length=40)
    to_stage = constr(min_length=1, max_length=40)
    note: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}  
