"""Rasteriza la marca vectorial original; no crea capturas ficticias de la app."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import math

ROOT = Path(__file__).resolve().parents[1]
RES = ROOT / 'android/app/src/main/res'
STORE = ROOT / 'publishing/graphics'
STORE.mkdir(parents=True, exist_ok=True)
GREEN, INK, PAPER = '#dcf68c', '#202d28', '#fcfdf9'

def mark(draw, box, fill=INK, hole=GREEN):
    x,y,size = box
    points=[]
    curves=[((32,7),(40,24),(40,24),(57,32)),((57,32),(40,40),(40,40),(32,57)),((32,57),(24,40),(24,40),(7,32)),((7,32),(24,24),(24,24),(32,7))]
    for curve in curves:
        for n in range(41):
            t=n/40
            px=sum(math.comb(3,i)*(1-t)**(3-i)*t**i*curve[i][0] for i in range(4))
            py=sum(math.comb(3,i)*(1-t)**(3-i)*t**i*curve[i][1] for i in range(4))
            points.append((x+px*size/64,y+py*size/64))
    draw.polygon(points,fill=fill)
    draw.ellipse((x+25*size/64,y+25*size/64,x+39*size/64,y+39*size/64),fill=hole)

def icon(size, shape=None):
    scale=4
    canvas=size*scale
    im=Image.new('RGBA' if shape else 'RGB',(canvas,canvas),(0,0,0,0) if shape else GREEN)
    draw=ImageDraw.Draw(im)
    if shape:
        pad=round(canvas*.055)
        box=(pad,pad,canvas-pad,canvas-pad)
        if shape=='round': draw.ellipse(box,fill=GREEN)
        else: draw.rounded_rectangle(box,radius=round(canvas*.22),fill=GREEN)
        mark(draw,(canvas*.1,canvas*.1,canvas*.8))
    else: mark(draw,(0,0,canvas))
    return im.resize((size,size),Image.Resampling.LANCZOS)

for density,size in [('mdpi',48),('hdpi',72),('xhdpi',96),('xxhdpi',144),('xxxhdpi',192)]:
    directory=RES/f'mipmap-{density}'
    directory.mkdir(exist_ok=True)
    for name in ('ic_launcher.png','ic_launcher_round.png'):
        icon(size,'round' if 'round' in name else 'rounded').save(directory/name)
    # Adaptive foreground is now a density-independent vector, not the template bitmap.
    old=directory/'ic_launcher_foreground.png'
    if old.exists(): old.unlink()

icon(512).save(STORE/'app-icon-512.png')
foreground='''<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android" android:width="108dp" android:height="108dp" android:viewportWidth="108" android:viewportHeight="108">
  <group android:translateX="22" android:translateY="22">
    <path android:fillColor="#202d28" android:fillType="evenOdd" android:pathData="M32,7C40,24 40,24 57,32C40,40 40,40 32,57C24,40 24,40 7,32C24,24 24,24 32,7Z M39,32A7,7 0,1 0,25 32A7,7 0,1 0,39 32Z"/>
  </group>
</vector>
'''
(RES/'drawable/ic_launcher_foreground.xml').write_text(foreground,encoding='utf8')
(RES/'values/ic_launcher_background.xml').write_text('<resources><color name="ic_launcher_background">#dcf68c</color><color name="afin_paper">#fcfdf9</color></resources>\n',encoding='utf8')
adaptive='''<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
  <background android:drawable="@color/ic_launcher_background"/>
  <foreground android:drawable="@drawable/ic_launcher_foreground"/>
  <monochrome android:drawable="@drawable/ic_launcher_foreground"/>
</adaptive-icon>
'''
for name in ('ic_launcher.xml','ic_launcher_round.xml'):
    (RES/'mipmap-anydpi-v26'/name).write_text(adaptive,encoding='utf8')
for old in [RES/'drawable/ic_launcher_background.xml',RES/'drawable-v24/ic_launcher_foreground.xml']:
    if old.exists(): old.unlink()
old_folder=RES/'drawable-v24'
if old_folder.exists() and not any(old_folder.iterdir()): old_folder.rmdir()
for old in RES.glob('drawable*/splash.png'): old.unlink()
(RES/'drawable/splash.xml').write_text('''<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
  <item android:drawable="@color/afin_paper"/>
  <item android:width="144dp" android:height="144dp" android:gravity="center" android:drawable="@drawable/ic_launcher_foreground"/>
</layer-list>
''',encoding='utf8')

# Store graphic uses only the original mark, colors and exact typography.
im=Image.new('RGB',(1024,500),PAPER)
d=ImageDraw.Draw(im)
fonts=Path('C:/Windows/Fonts')
if not fonts.exists(): fonts=Path('/usr/share/fonts/truetype/dejavu')
def font(size,bold=False):
    name=('segoeuib.ttf' if bold else 'segoeui.ttf') if (fonts/'segoeui.ttf').exists() else ('DejaVuSans-Bold.ttf' if bold else 'DejaVuSans.ttf')
    return ImageFont.truetype(str(fonts/name),size)
d.text((64,48),'AFÍN',font=font(22,True),fill=INK)
d.text((64,118),'Tus ideas tienen',font=font(56,True),fill=INK)
d.text((64,185),'más de un color.',font=font(56,True),fill=INK)
d.text((67,291),'Un juego para explorar tus matices.',font=font(23),fill=INK)
for x,y,c in [(758,75,GREEN),(798,181,'#d9d4fa'),(746,287,'#f7d7a8')]:
    d.rounded_rectangle((x,y,x+168,y+100),radius=24,fill=c)
    mark(d,(x+50,y+16,68),INK,c)
d.text((66,413),'34 preguntas  ·  Sin registro  ·  Fuentes consultables',font=font(20),fill=INK)
im.save(STORE/'feature-graphic-1024x500.png')
print('Iconos Android, splash e imágenes de ficha generados con la marca original.')
