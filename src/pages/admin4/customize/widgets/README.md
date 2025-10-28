# Widget Customizer Pages

این folder شامل صفحات مخصوص customize کردن widget های مختلف است.

## ساختار

هر widget یک صفحه مستقل دارد که از `CustomizerLayout` استفاده می‌کند.

## صفحات موجود

- `events-list-customize.tsx` - تنظیمات Events List Widget
- `discussions-list-customize.tsx` - تنظیمات Discussions List Widget  
- `knowledges-list-customize.tsx` - تنظیمات Knowledges List Widget
- `wishlists-list-customize.tsx` - تنظیمات Wishlists List Widget
- `questions-list-customize.tsx` - تنظیمات Questions List Widget

## URL Pattern

همه این صفحات از URL pattern زیر پیروی می‌کنند:

```
/admin4/site/spaces/{folder}/{space-type}/customize/widget/{widget-name}
```

مثال‌ها:
- `/admin4/site/spaces/growth/events/customize/widget/events-list`
- `/admin4/site/spaces/myfolder/blog/customize/widget/discussions-list`
- `/admin4/design/spaces/explore/customize/widget/knowledges-list`

## استفاده

برای اضافه کردن widget جدید:

1. فایل جدید بساز (مثل `new-widget-customize.tsx`)
2. از `CustomizerLayout` استفاده کن
3. Config component مربوطه رو pass کن
4. Route جدید در `main.tsx` اضافه کن

## مثال

```tsx
import { CustomizerLayout } from '@/components/layouts/customizer-layout';
import { NewWidgetConfig } from '@/components/.../widget-configs/new-widget-config';

const NewWidgetCustomizePage = () => {
  return (
    <CustomizerLayout
      sidebarTitle="Configure New Widget"
      sidebarDescription="Configure widget settings"
      configSidebarContent={<NewWidgetConfig />}
    >
      <BrowserMockup />
    </CustomizerLayout>
  );
};
```


