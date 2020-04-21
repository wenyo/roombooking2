# White Space / RoomBooking
2019 The F2E 前端修煉精神時光屋 - 第六關
利用 Vue CLI 介接 API 實作飯店預約功能

wenyo [White Space](https://wenyo.github.io/roombooking2/#/)  
edith.hsu [UI設計稿](https://challenge.thef2e.com/user/1600?fbclid=IwAR2oYLpm_gLo5RI6AHXnqH9iIrWTMZzbMBLE4Qrfz0JQJw9jR2lNoHVOypI) 

## 基本功能
### 首頁
列出六種不同房型與價格

## API 
#### URL
```
https://challenge.thef2e.com/api/thef2e2019/stage6/rooms
```
#### Response Example Model
```
{
    "success" (boolean): 成功與否,
    "item": [
        (RoomItem) 房型資料，陣列
    ]
}
RoomItem:

{
    "id" (string): 房間編號,
    "imageUrl" (string): 圖片網址,
    "normalDayPrice" (integer): 平日價格,
    "holidayPrice" (integer): 假日價格,
    "name" (string): 房間名稱
}
```
### 

***
特別感謝 六角學院