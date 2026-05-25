import os
import re

for filename in os.listdir('/tmp/stitch-screens'):
    if not filename.endswith('.html'): continue
    path = os.path.join('/tmp/stitch-screens', filename)
    with open(path) as f:
        html = f.read()
    
    # Very basic html to jsx
    # self closing tags
    for tag in ['img', 'input', 'br', 'hr', 'path', 'circle', 'line', 'polyline', 'rect', 'ellipse', 'polygon']:
        # simplistic replace for unclosed tags
        # Not perfect, we might just rely on prettier later or manual fix
        pass
    
    html = re.sub(r'<img(.*?)(?<!/)>', r'<img\1 />', html)
    html = re.sub(r'<input(.*?)(?<!/)>', r'<input\1 />', html)
    html = re.sub(r'<br(.*?)(?<!/)>', r'<br\1 />', html)
    html = re.sub(r'<hr(.*?)(?<!/)>', r'<hr\1 />', html)
    
    # CSS inline styles like style="color: red" -> style={{color: 'red'}} handled manually if needed
    html = re.sub(r'style="([^"]*)"', lambda m: 'style={{' + ', '.join([f"'{k.strip()}': '{v.strip()}'" for k, v in [p.split(':') for p in m.group(1).split(';') if ':' in p]]) + '}}', html)
    
    # class -> className
    html = html.replace('class=', 'className=')
    html = html.replace('for=', 'htmlFor=')
    html = html.replace('stroke-width=', 'strokeWidth=')
    html = html.replace('stroke-linecap=', 'strokeLinecap=')
    html = html.replace('stroke-linejoin=', 'strokeLinejoin=')
    html = html.replace('fill-rule=', 'fillRule=')
    html = html.replace('clip-rule=', 'clipRule=')
    
    with open(path.replace('.html', '.tsx'), 'w') as f:
        f.write(html)
