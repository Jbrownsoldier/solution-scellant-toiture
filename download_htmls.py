import urllib.request

urls = {
  "48f_areas.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2VhZjViNWYyNjJkODRkZTRhNjEwNWY1MzJmZDFkODVhEgsSBxCG2P-fjQoYAZIBIwoKcHJvamVjdF9pZBIVQhM4NjU4MTM5NzkxNTk3NzgwNTYx&filename=&opi=89354086",
  "903_services.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2ZjMGYxNjE1OGY1YjQzNGM5NGFkYjUzZjk4MjhjNzZiEgsSBxCG2P-fjQoYAZIBIwoKcHJvamVjdF9pZBIVQhM4NjU4MTM5NzkxNTk3NzgwNTYx&filename=&opi=89354086",
  "f11_about.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAxMzI1ZDhjOWZhYTRiOWM5YTNhOTczZDk2MzZjODIwEgsSBxCG2P-fjQoYAZIBIwoKcHJvamVjdF9pZBIVQhM4NjU4MTM5NzkxNTk3NzgwNTYx&filename=&opi=89354086",
  "666_hero.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzU1NWJkYTVlMGQ0NDRjZjA5ZjU4YTY2OTBmZWRjY2NkEgsSBxCG2P-fjQoYAZIBIwoKcHJvamVjdF9pZBIVQhM4NjU4MTM5NzkxNTk3NzgwNTYx&filename=&opi=89354086",
  "aa3_reviews.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzVhODllODA0NGQ5ODQwOWE5MTkzNjc2ZmM4YTJmOGE1EgsSBxCG2P-fjQoYAZIBIwoKcHJvamVjdF9pZBIVQhM4NjU4MTM5NzkxNTk3NzgwNTYx&filename=&opi=89354086",
  "987_contact.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2IyMTM5MmI0NmNkOTQ4M2E4NTA0NWNmOTM2OTU5YWRmEgsSBxCG2P-fjQoYAZIBIwoKcHJvamVjdF9pZBIVQhM4NjU4MTM5NzkxNTk3NzgwNTYx&filename=&opi=89354086"
}

for name, url in urls.items():
    print(f"Downloading {name}...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    # extract body innerHTML roughly
    try:
        start = html.index('<body')
        start = html.index('>', start) + 1
        end = html.rindex('</body>')
        body = html[start:end].strip()
        # rudimentary html to jsx
        body = body.replace('class=', 'className=')
        body = body.replace('for=', 'htmlFor=')
        body = body.replace('<!--', '{/*')
        body = body.replace('-->', '*/}')
        # self-closing tags
        for tag in ['img', 'input', 'br', 'hr']:
           # This regex isn't perfect but simple string replace for common patterns
           pass 
        with open(f"/tmp/stitch-screens/{name}", "w") as f:
            f.write(body)
    except Exception as e:
        print(f"Failed to parse {name}: {e}")
