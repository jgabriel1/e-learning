from typing import List

from metomi.isodatetime.parsers import DurationParser
from pydantic import BaseModel, validator


class _ContentDetails(BaseModel):
    duration: int

    @validator("duration", pre=True, check_fields=False)
    def convert_duration_to_minutes(cls, v: str):
        duration = DurationParser().parse(v)

        return round(duration.get_seconds() / 60)


class _Item(BaseModel):
    contentDetails: _ContentDetails


class YoutubeAPIVideoResponseData(BaseModel):
    items: List[_Item]
