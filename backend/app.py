from enum import Enum
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

from base import StrEnumMore

class CityName(str, Enum):
    Beijing = "Beijing"
    Wuhan = "Wuhan"
    Other = "Other"

app = FastAPI(
  title='FastAPI Tutorial and Coronavirus Tracker API Docs',
  description='FastAPI教程 新冠病毒疫情跟踪器API接口文档，项目代码：https://github.com/liaogx/fastapi-tutorial',
  version='1.0.0',
  docs_url='/docs',
  redoc_url='/redocs',
)

app.openapi_version = "3.0.2"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CityInfo(BaseModel):
    province: str
    country: str
    is_affected: Optional[bool] = None

class CityGetRes(BaseModel):
    city: str
    query_string: Optional[str] = None

class CityPutRes(BaseModel):
    city: CityName

# 1.重点：使用装饰器把方法变成接口
@app.get('/', response_model=str, operation_id="home", tags=["city"])
async def hello_world():
    return 'hello world'

# 2.参数获取：路径参数和query参数
@app.get('/city/{city}', response_model=CityGetRes, operation_id="city_list", tags=["city"])
async def getCity(city: str, query_string: Optional[str] = None):
    return {'city': city, 'query_string': query_string}

@app.put('/city/{city}', response_model=CityPutRes, operation_id="put_city", tags=["city"])
async def putCity(city: CityName):
  return {'city': city, }
