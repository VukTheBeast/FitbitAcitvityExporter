# FitbitAcitvityExporter
Simple web page [link](https://vukthebeast.github.io/FitbitAcitvityExporter) that you can download yor activities from FitBit plaform.

## Descritpion
This is simple FitBit activity exporter. In simple words this tool enable you to donwload FitBit activity like Run, Hike or Swim.

## Reason
I was quite anoyed that I can't download all my activities from FitBit platform at ones. Thats why I created simple page that can enable you that.

## Why you want to dowload your activities?
In my case, I wanted to migrate my activities from FitBit to Garmin.


## How to get your auth token?
Go to web broweser (prefere Chrome or Mozzila)
Open and log in to your FitBit account.
Pres F12 keybord. It should open developer tool.
Go to Console tab.
Copy and past this code:

```
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
getCookie("oauth_access_token")
```
After pressing Enter, it should get you token. Copy value (inside '') and paste it to input feild.
---
**Still in progress, so I will add more functionalities. If you have any idea, please write me. I am open to it.**

