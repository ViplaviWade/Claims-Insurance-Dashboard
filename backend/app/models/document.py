from sqlalchemy import String, Integer, DateTime, ForeignKey, func, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from typing import Optional
from app.db import Base

class ClaimDocument(Base):
    __tablename__ = "claim_documents"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    claim_id: Mapped[int] = mapped_column(ForeignKey("claims.id", ondelete="CASCADE"))
    filename: Mapped[str] = mapped_column(String(255))
    label: Mapped[str | None] = mapped_column(String(80), nullable=True)
    uploaded_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default= func.now())
    # New AI fields
    summary: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    doc_type: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    s3_key: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)

    claim = relationship("Claim", back_populates="documents")