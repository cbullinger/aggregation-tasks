from dataclasses import dataclass, field
from typing import List, Optional

@dataclass
class Business:
    business_id: str
    name: str
    city: str
    stars: Optional[double] = None
    review_count: Optional[int] = None
    is_open: Optional[bool] = None
    categories: List[str] = field(default_factory=list)

@dataclass
class Review:
    review_id: str
    user_id: str
    business_id: str
    stars: Optional[double] = None
    date: Optional[str] = None  # ISO “YYYY-MM-DD”
    text: Optional[str] = None
    useful: Optional[int] = None
    unhelpful: Optional[int] = None
