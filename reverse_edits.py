import json

transcript_path = "/Users/mymac/.gemini/antigravity-ide/brain/5aba36d0-1a82-4929-9add-ca5bf28f2aa8/.system_generated/logs/transcript_full.jsonl"
edits = []

with open(transcript_path, "r") as f:
    for line in f:
        data = json.loads(line)
        if "tool_calls" in data:
            for tc in data["tool_calls"]:
                if tc["name"] == "replace_file_content":
                    args = tc["args"]
                    edits.append({
                        "file": args["TargetFile"],
                        "target": args["TargetContent"],
                        "replacement": args["ReplacementContent"]
                    })
                elif tc["name"] == "multi_replace_file_content":
                    args = tc["args"]
                    for chunk in args["ReplacementChunks"]:
                        edits.append({
                            "file": args["TargetFile"],
                            "target": chunk["TargetContent"],
                            "replacement": chunk["ReplacementContent"]
                        })

print(f"Found {len(edits)} edits to reverse.")
# Reverse the edits
for edit in reversed(edits):
    file_path = edit["file"]
    try:
        with open(file_path, "r") as f:
            content = f.read()
        if edit["replacement"] in content:
            content = content.replace(edit["replacement"], edit["target"])
            with open(file_path, "w") as f:
                f.write(content)
            print(f"Reversed edit in {file_path}")
        else:
            print(f"Could not find replacement text in {file_path}")
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
