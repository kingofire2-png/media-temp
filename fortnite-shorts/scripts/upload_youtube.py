"""Upload an approved MP4 to YouTube as PRIVATE using repository Actions secrets."""
import os
import sys
from pathlib import Path
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

def main():
    file_path = Path(sys.argv[1])
    if not file_path.is_file():
        raise FileNotFoundError(file_path)
    creds = Credentials(
        token=None,
        refresh_token=os.environ["YT_REFRESH_TOKEN"],
        token_uri="https://oauth2.googleapis.com/token",
        client_id=os.environ["YT_CLIENT_ID"],
        client_secret=os.environ["YT_CLIENT_SECRET"],
        scopes=["https://www.googleapis.com/auth/youtube.upload"],
    )
    creds.refresh(Request())
    youtube = build("youtube", "v3", credentials=creds, cache_discovery=False)
    request = youtube.videos().insert(
        part="snippet,status",
        body={
            "snippet": {
                "title": "Fortnite: 3 errori da evitare (test privato)",
                "description": "Test tecnico Remotion. Non ancora completo di gameplay e narrazione.",
                "categoryId": "20",
            },
            "status": {"privacyStatus": "private", "selfDeclaredMadeForKids": False},
        },
        media_body=MediaFileUpload(str(file_path), mimetype="video/mp4", resumable=True),
    )
    response = None
    while response is None:
        _, response = request.next_chunk()
    print("Private YouTube video:", "https://www.youtube.com/watch?v=" + response["id"])

if __name__ == "__main__":
    main()
