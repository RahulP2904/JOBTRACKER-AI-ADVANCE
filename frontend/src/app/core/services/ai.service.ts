import { Injectable, signal } from '@angular/core';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AIService {
  messages = signal<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: '👋 Hi Rahul! I am your JobFlow Career Copilot. I can analyze your application pipeline, generate STAR interview answers, or draft recruiter follow-ups.',
      timestamp: '10:00 AM',
      suggestedActions: [
        'Analyze my application pipeline',
        'Help me prepare for Vercel interview',
        'Draft follow-up email for Linear'
      ]
    }
  ]);

  isOpen = signal<boolean>(false);
  isThinking = signal<boolean>(false);

  toggleDrawer() {
    this.isOpen.set(!this.isOpen());
  }

  sendMessage(text: string) {
    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    this.messages.update(current => [...current, userMsg]);
    this.isThinking.set(true);

    setTimeout(() => {
      const q = text.toLowerCase();
      let replyText = "🤖 **JobFlow AI**: I have analyzed your search. Focus on completing your STAR prep for Vercel and following up with Linear.";
      let actions = ["View Vercel details", "Draft follow-up", "Review salary metrics"];

      if (q.includes('pipeline') || q.includes('analyze') || q.includes('status')) {
        replyText = "📊 **Pipeline Breakdown**:\n- **Active Applications**: 6 active roles.\n- **Response Rate**: **37.5%** (Strong performance!).\n- **Stale Alert**: Notion application submitted 5 days ago without update.";
        actions = ["Draft Notion follow-up", "View active roles"];
      } else if (q.includes('interview') || q.includes('vercel') || q.includes('star')) {
        replyText = "🎯 **Vercel Final Interview Prep**:\n- **Core Question**: 'Tell me about a time you optimized application rendering.'\n- **STAR Response**:\n  - **S**: High latency in dynamic dashboards.\n  - **T**: Target sub-100ms render time.\n  - **A**: Implemented Angular Signals + OnPush strategy & Redis backend caching.\n  - **R**: 65% reduction in initial page load time!";
        actions = ["Copy STAR answer", "Open interview checklist"];
      }

      const aiMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: actions
      };

      this.messages.update(current => [...current, aiMsg]);
      this.isThinking.set(false);
    }, 1000);
  }
}
