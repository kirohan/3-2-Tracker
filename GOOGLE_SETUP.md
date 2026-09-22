# Google tracking setup

The repository is already configured to use this master Google Sheet:

`https://docs.google.com/spreadsheets/d/1WRGS7WJIWpgdKtgoLukDnohH_XZkkWoAUH9FyFjlnyQ/edit?usp=sharing`

## Required sharing setting

Open the master Sheet and choose:

**Share → General access → Anyone with the link → Viewer**

This is important. The master must be viewable so Google's `/copy` screen can create a personal copy for each BECM 2K22 student.

## Student flow

1. Student clicks **Track with Google**.
2. Google asks them to sign in or choose a Google account.
3. Google shows **Copy document**.
4. Student clicks **Make a copy**.
5. The copied tracker opens in the student's own Google Drive.

No Gmail address or attendance data passes through the website.

## To change the master later

Edit `config.js` and replace `googleSheetTemplateUrl` with the new Google Sheets viewer link.
