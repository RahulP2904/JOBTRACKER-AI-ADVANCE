import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';

import {
  LucideAngularModule,
  LayoutDashboard, Briefcase, Trello, Search, Calendar,
  Users, Building2, UserCheck, Network, FileText, BarChart3, Target,
  Bell, Settings, HelpCircle, User, Moon, Sun, ChevronLeft, ChevronRight,
  ArrowUpRight, Clock, Plus, CheckCircle2, ChevronDown, X, Filter,
  TrendingUp, TrendingDown, Award, Zap, Star, Heart, Bookmark,
  Edit2, Trash2, Eye, Download, Upload, Share2, Copy, ExternalLink,
  MapPin, DollarSign, Mail, Phone, Linkedin, Github, Globe,
  ChevronUp, Menu, MoreHorizontal, MoreVertical,
  Send, Bot, Sparkles, MessageSquare, Lightbulb, RefreshCw,
  GraduationCap, Layers, Tag, AlertCircle, Info, CheckCircle,
  Grid, List, SlidersHorizontal, ArrowLeft, ArrowRight,
  Home, LogOut, Lock, Unlock, Key, Shield,
  PieChart, LineChart, Activity, Percent,
  Folder, FolderOpen, Image, Video, Music, File,
  XCircle, PlusCircle, MinusCircle, Circle,
  Pencil, Check, Minus, RotateCcw, RotateCw,
  Building, Map, Navigation, Compass,
  PlayCircle, PauseCircle, StopCircle, SkipForward,
  Maximize2, Minimize2, Move,
  CloudUpload, CloudDownload, Cloud,
  Link, Unlink, Anchor,
  Flag, Trophy, Medal, Crown, Flame, Rocket, Cpu,
  ThumbsUp, ThumbsDown, Smile, Frown, Meh,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Bold, Italic, Hash, AtSign, Type,
  Laptop, Smartphone, Monitor, Tablet,
  SortAsc, SortDesc, ArrowUpDown,
  Loader, Loader2, RefreshCcw,
  AlertTriangle,
  ClipboardList, ClipboardCheck, Clipboard,
  CalendarDays, CalendarCheck, CalendarX,
  UserPlus, UserMinus,
  BarChart, BarChart2,
  Table, Rows, Columns,
  Quote, MessageCircle, Inbox,
  Hourglass, Timer, CheckSquare, Square
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions({ skipInitialTransition: true })),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      LucideAngularModule.pick({
        LayoutDashboard, Briefcase, Trello, Search, Calendar,
        Users, Building2, UserCheck, Network, FileText, BarChart3, Target,
        Bell, Settings, HelpCircle, User, Moon, Sun, ChevronLeft, ChevronRight,
        ArrowUpRight, Clock, Plus, CheckCircle2, ChevronDown, X, Filter,
        TrendingUp, TrendingDown, Award, Zap, Star, Heart, Bookmark,
        Edit2, Trash2, Eye, Download, Upload, Share2, Copy, ExternalLink,
        MapPin, DollarSign, Mail, Phone, Linkedin, Github, Globe,
        ChevronUp, Menu, MoreHorizontal, MoreVertical,
        Send, Bot, Sparkles, MessageSquare, Lightbulb, RefreshCw,
        GraduationCap, Layers, Tag, AlertCircle, Info, CheckCircle,
        Grid, List, SlidersHorizontal, ArrowLeft, ArrowRight,
        Home, LogOut, Lock, Unlock, Key, Shield,
        PieChart, LineChart, Activity, Percent,
        Folder, FolderOpen, Image, Video, Music, File,
        XCircle, PlusCircle, MinusCircle, Circle,
        Pencil, Check, Minus, RotateCcw, RotateCw,
        Building, Map, Navigation, Compass,
        PlayCircle, PauseCircle, StopCircle, SkipForward,
        Maximize2, Minimize2, Move,
        CloudUpload, CloudDownload, Cloud,
        Link, Unlink, Anchor,
        Flag, Trophy, Medal, Crown, Flame, Rocket, Cpu,
        ThumbsUp, ThumbsDown, Smile, Frown, Meh,
        AlignLeft, AlignCenter, AlignRight, AlignJustify,
        Bold, Italic, Hash, AtSign, Type,
        Laptop, Smartphone, Monitor, Tablet,
        SortAsc, SortDesc, ArrowUpDown,
        Loader, Loader2, RefreshCcw,
        AlertTriangle,
        ClipboardList, ClipboardCheck, Clipboard,
        CalendarDays, CalendarCheck, CalendarX,
        UserPlus, UserMinus,
        BarChart, BarChart2,
        Table, Rows, Columns,
        Quote, MessageCircle, Inbox,
        Hourglass, Timer, CheckSquare, Square
      })
    )
  ]
};
