import subprocess
import json
import os

with open("/Users/jamalbrown/.gemini/antigravity/brain/6f2b543c-b29c-4a91-bd4a-70cf4832c414/.system_generated/steps/239/output.txt") as f:
    data = json.load(f)

for screen in data["screens"]:
    project_id = screen["name"].split("/")[1]
    screen_id = screen["name"].split("/")[3]
    name = screen["name"]
    print(f"Fetching {screen_id}...")
    
    cmd = f'jq -n --arg name "{name}" --arg pid "{project_id}" --arg sid "{screen_id}" \'{{"name": $name, "projectId": $pid, "screenId": $sid}}\' > req.json'
    os.system(cmd)
