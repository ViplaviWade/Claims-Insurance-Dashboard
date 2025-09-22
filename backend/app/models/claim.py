from sqlalchemy import String, Integer, DateTime, Enum, func, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db import Base
from datetime import datetime
import enum

class ClaimStage(str, enum.Enum):
    InitialFiling = "InitialFiling"
    DocumentCollection = "DocumentCollection"
    Review = "Review"
    Assessment = "Assessment"
    Approval = "Approval"
    Negotiation = "Negotiation"
    Settlement = "Settlement"
    PaymentProcessing = "PaymentProcessing"
    QualityAssurance = "QualityAssurance"
    CaseClosure = "CaseClosure"

class Claim(Base):
    __tablename__ = "claims"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    policy_holder: Mapped[str] = mapped_column(String(120))
    policy_number: Mapped[str] = mapped_column(String(10))
    stage: Mapped[ClaimStage] = mapped_column(Enum(ClaimStage), default=ClaimStage.InitialFiling)
    status: Mapped[str] = mapped_column(String(24), default="Open")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    documents = relationship("ClaimDocument", back_populates="claim")
    history = relationship("ClaimHistory", back_populates="claim")

    
