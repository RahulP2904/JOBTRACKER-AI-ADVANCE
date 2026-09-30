from fastapi import APIRouter, Depends
from app.schemas.schemas import AIChatRequest, AIChatResponse
from app.services.ai_service import AIService
from app.models.domain import User
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()

@router.post("/chat", response_model=AIChatResponse)
async def chat_copilot(req: AIChatRequest, current_user: User = Depends(get_current_user)):
    res = await AIService.process_chat(req.message, req.context)
    return AIChatResponse(reply=res["reply"], suggested_actions=res.get("suggested_actions"))
