"""Tag every clickable tasvir.ai link in a README with utm params (idempotent).

Usage: python3 scripts/tag-readme-links.py ../Tasvir-YKS-Hazirlik/README.md yks
Campaigns in use: tasvir, tasvir-tr, canvas-en, canvas-tr, yks, web-figma-en.
"""
import re, sys
from urllib.parse import urlsplit, urlunsplit, parse_qsl, urlencode

TR = str.maketrans("çğıöşüÇĞİÖŞÜâîû", "cgiosuCGIOSUaiu")
ASSET = re.compile(r"\.(png|jpe?g|webp|gif|svg|mp4|ico|css|js)$", re.I)
URL = re.compile(r'(?P<pre>\]\(|href=")(?P<url>https://(?:www\.|app\.)?tasvir\.ai[^\s")]*)')

def slug(text, limit):
    text = re.sub(r"!\[([^\]]*)\]\([^)]*\)", r"\1", text or "")
    text = re.sub(r"<[^>]+>", " ", text).translate(TR).lower()
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text[:limit].strip("-")

def label_for(s, m):
    if m.group("pre") == "](":
        depth, i = 0, m.start() - 1
        while i >= 0:
            if s[i] == "]": depth += 1
            elif s[i] == "[":
                if depth == 0: break
                depth -= 1
            i -= 1
        inner = s[i + 1:m.start()] if i >= 0 else ""
        alt = re.search(r"!\[([^\]]+)\]", inner)
        return alt.group(1) if alt and not re.sub(r"!\[[^\]]*\]\([^)]*\)", "", inner).strip() else inner
    end = s.find("</a>", m.end())
    inner = s[m.end():end if end > 0 else m.end() + 400]
    alt = re.search(r'alt="([^"]+)"', inner)
    return alt.group(1) if alt else re.sub(r"<[^>]+>", " ", inner.split(">", 1)[-1])

def section_for(s, pos):
    heads = list(re.finditer(r"^#{1,6}\s+(.+)$", s[:pos], re.M))
    return heads[-1].group(1) if heads else "top"

def tag(url, campaign, content):
    parts = urlsplit(url)
    if ASSET.search(parts.path): return url
    q = dict(parse_qsl(parts.query, keep_blank_values=True))
    if q.get("utm_source") and q.get("utm_campaign") and q.get("utm_content"): return url
    q.setdefault("utm_source", "github")
    q.setdefault("utm_medium", "readme")
    q.setdefault("utm_campaign", campaign)
    q.setdefault("utm_content", content)
    return urlunsplit(parts._replace(query=urlencode(q, safe="/")))

def run(path, campaign):
    s = open(path, encoding="utf-8", newline="").read()
    out, last, changed = [], 0, 0
    for m in URL.finditer(s):
        url = m.group("url")
        content = "-".join(x for x in (slug(section_for(s, m.start()), 20), slug(label_for(s, m), 40)) if x) or "link"
        new = tag(url, campaign, content)
        changed += new != url
        out.append(s[last:m.start("url")]); out.append(new); last = m.end("url")
    out.append(s[last:])
    open(path, "w", encoding="utf-8", newline="").write("".join(out))
    print(f"{path}: {changed} links tagged")

if __name__ == "__main__":
    run(sys.argv[1], sys.argv[2])
