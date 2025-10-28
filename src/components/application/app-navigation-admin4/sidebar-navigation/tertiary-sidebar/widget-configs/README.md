# Widget Configurations

این پوشه شامل کامپوننت‌های configuration برای انواع مختلف widget ها است.

## 📁 ساختار فایل‌ها

### 1. `events-list-config.tsx`
**Widget**: Events List  
**بخش‌های configuration**:
- Info (Title, Description)
- Tab Views (All, Upcoming, Past)
- Layout (Style, Card Size, Card Style)
- Properties (Event cover, Event details, Host info, Attended)

### 2. `custom-events-list-config.tsx`
**Widget**: Custom Events List  
**بخش‌های configuration**:
- Info (Title, Description)
- Resource (Event Source Selection + Multi-select)
- Layout (Style with Carousel support, Card Size, Card Style)
- Properties (Event cover, Event details, Host info, Attended)
- Add Filter functionality

### 3. `space-header-config.tsx`
**Widget**: Space Header  
**بخش‌های configuration**:
- Style (Simple, Color, Image, Video, Gradient)
- Properties (Icon, Description, Stats, Members, Actions)

### 4. `announcement-banner-config.tsx`
**Widget**: Announcement Banner  
**بخش‌های configuration**:
- Basic (Title, URL)
- Style (Primary, Natural, Warning, Error, Info)
- Properties (Icon, Close Button)

### 5. `leaderboard-config.tsx`
**Widget**: Leaderboard  
**بخش‌های configuration**:
- Basic (Title, Source)
- Style (Number of Members, Default Tab)
- Properties (Show Score, Exclude Admins & Moderators)

### 6. `html-script-config.tsx`
**Widget**: Html Script  
**بخش‌های configuration**:
- Basic (Code Input - HTML/CSS/JS)
- Style (Card, No Padding, None)

### 7. `rich-text-config.tsx`
**Widget**: Rich Text  
**بخش‌های configuration**:
- Basic (Content with Markdown support)
- Style (Card, No Padding, None)

## 🔧 نحوه استفاده

همه کامپوننت‌ها از `useWidgetConfig` hook استفاده می‌کنند و configurations خود را مستقیماً از context provider می‌گیرند.

```tsx
import { EventsListConfig } from './widget-configs';

// استفاده در کامپوننت والد
<EventsListConfig onTabConfigChange={handleTabConfigChange} />
```

## 📦 Export ها

فایل `index.ts` تمام کامپوننت‌ها را export می‌کند:

```tsx
export { EventsListConfig } from './events-list-config';
export { CustomEventsListConfig } from './custom-events-list-config';
export { SpaceHeaderConfig } from './space-header-config';
export { AnnouncementBannerConfig } from './announcement-banner-config';
export { LeaderboardConfig } from './leaderboard-config';
export { HtmlScriptConfig } from './html-script-config';
export { RichTextConfig } from './rich-text-config';
```

## 🎯 مزایای ساختار جدید

1. **Modularity**: هر widget configuration در فایل جداگانه‌ای است
2. **Maintainability**: تغییرات در یک widget بر دیگر widget ها تاثیری ندارد
3. **Readability**: کد خیلی واضح‌تر و قابل فهم‌تر است
4. **Reusability**: می‌توان هر کدام را به صورت مستقل استفاده کرد
5. **Performance**: فقط configuration مورد نیاز load می‌شود

## 🔄 مراحل اضافه کردن Widget جدید

1. فایل جدید در این پوشه بسازید (مثلاً `my-widget-config.tsx`)
2. کامپوننت configuration را implement کنید
3. از `useWidgetConfig` برای دسترسی به config استفاده کنید
4. کامپوننت را در `index.ts` export کنید
5. در فایل `widget-config.tsx` والد، switch case جدید اضافه کنید

