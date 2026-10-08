# Draws every handshape, letter, and number picture in images/ as SVG.
# Run from anywhere with: python3 tools/draw-hands.py
# Edit the HANDSHAPES, LETTERS, and NUMS tables at the bottom to change a picture.
import math, os
SKIN="url(#skin)"; SKINFLAT="#F7D6C2"; SHADE="#E7AE92"; INK="#4A2E24"; ARROW="#A8243A"; HI="#FFF4EC"
OUT=7; W=21  # outline extra, finger width

# finger bases (palm view, thumb on viewer's right)
BASE={"p":(71,120),"r":(91,116),"m":(111,115),"i":(131,118)}
LEN={"p":50,"r":64,"m":72,"i":66}
SPREAD={"p":-16,"r":-6,"m":3,"i":13}
TOG={"p":-4,"r":-1.5,"m":1.5,"i":4}

def pt(base,ang,l):
    a=math.radians(ang); return (base[0]+l*math.sin(a), base[1]-l*math.cos(a))

def stroke(d, w=W, hi=True):
    out=(f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{w+OUT}" stroke-linecap="round" stroke-linejoin="round"/>'
         f'<path d="{d}" fill="none" stroke="{SKIN}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>')
    if hi:
        out+=f'<path d="{d}" fill="none" stroke="{HI}" stroke-opacity=".55" stroke-width="{max(3,w*0.22):.1f}" stroke-linecap="round" stroke-linejoin="round" transform="translate(-{w*0.2:.1f} -1)"/>'
    return out
def tip_pad(x,y,r=7):
    return f'<ellipse cx="{x:.1f}" cy="{y:.1f}" rx="{r}" ry="{r*0.8}" fill="{SHADE}" opacity=".85"/>'
def creases(b,t,n=2):
    # small joint lines across a straight finger
    out=""
    for k in range(1,n+1):
        f=k/(n+1)+0.08
        x=b[0]+(t[0]-b[0])*f; y=b[1]+(t[1]-b[1])*f
        dx=t[0]-b[0]; dy=t[1]-b[1]; L=(dx*dx+dy*dy)**.5 or 1
        px,py=-dy/L*6,dx/L*6
        out+=f'<path d="M{x-px:.1f} {y-py:.1f} Q{x:.1f} {y+2:.1f} {x+px:.1f} {y+py:.1f}" fill="none" stroke="{SHADE}" stroke-width="2.2" stroke-linecap="round"/>'
    return out
def nail(t,b):
    dx=t[0]-b[0]; dy=t[1]-b[1]; L=(dx*dx+dy*dy)**.5 or 1
    x=t[0]-dx/L*7; y=t[1]-dy/L*7; ang=math.degrees(math.atan2(dx,-dy))
    return f'<rect x="{x-5.5:.1f}" y="{y-7:.1f}" width="11" height="13" rx="5" fill="#FBE6DA" stroke="{SHADE}" stroke-width="1.6" transform="rotate({ang:.1f} {x:.1f} {y:.1f})"/>'

def finger(f, state, spread=True, touch=None):
    b=BASE[f]; ang=(SPREAD if spread else TOG)[f]; L=LEN[f]
    if state=="up":
        t=pt(b,ang,L)
        deco = nail(t,b) if BACKVIEW[0] else creases(b,t)
        return stroke(f"M{b[0]} {b[1]+10} L{t[0]:.1f} {t[1]:.1f}") + deco, ""
    if state=="cross":   # crossed over the neighbour (R)
        t=pt(b,ang-14,L); return stroke(f"M{b[0]} {b[1]+10} L{t[0]:.1f} {t[1]:.1f}"), ""
    if state in ("hook","bent"):
        k=0.55 if state=="hook" else 0.42
        t=pt(b,ang,L*k)
        return stroke(f"M{b[0]} {b[1]+10} L{t[0]:.1f} {t[1]:.1f}"), tip_pad(t[0],t[1]+1)
    if state=="hooklow":  # E: fingertips bent down onto thumb
        t=pt(b,ang,L*0.3)
        return "", stroke(f"M{b[0]} {b[1]+6} Q{t[0]:.1f} {t[1]-14:.1f} {b[0]:.1f} {b[1]+28}") + tip_pad(b[0],b[1]+28)
    if state=="curl":
        return "", (stroke(f"M{b[0]} {b[1]-6} L{b[0]} {b[1]+24}", W+1)
            + f'<path d="M{b[0]-8} {b[1]+8} Q{b[0]} {b[1]+12} {b[0]+8} {b[1]+8}" fill="none" stroke="{SHADE}" stroke-width="2.2" stroke-linecap="round"/>'
            + tip_pad(b[0], b[1]+22, 6))
    if state=="touch":
        return "", stroke(f"M{b[0]} {b[1]-6} Q{b[0]} {b[1]-20} {b[0]+4} {b[1]+30}", W+1) + tip_pad(b[0]+4,b[1]+30)
    if state=="crossL":
        t=pt(b,-12,L); return stroke(f"M{b[0]} {b[1]+10} L{t[0]:.1f} {t[1]:.1f}"), ""
    if state=="crossR":
        t=pt(b,14,L); return "", stroke(f"M{b[0]} {b[1]+10} L{t[0]:.1f} {t[1]:.1f}")
    raise ValueError(state)

def thumb(state, touch=None):
    b=(140,176)
    if state=="out":    return stroke(f"M{b[0]} {b[1]} Q170 160 186 128",W+3), "back"
    if state=="side":   return stroke(f"M{b[0]} {b[1]} Q152 150 150 116",W+3), "front"
    if state=="up":     return stroke(f"M{b[0]} {b[1]} Q168 140 166 70",W+3), "back"
    if state=="across": return stroke(f"M{b[0]} {b[1]} Q140 150 82 150",W+3), "front"
    if state=="in":     return stroke(f"M{b[0]} {b[1]} Q128 168 92 160",W+3), "front"
    if state=="hook":   return stroke(f"M{b[0]} {b[1]} Q176 150 166 120",W+3)+tip_pad(166,121), "back"
    if state=="low":    return stroke(f"M{b[0]} {b[1]} Q130 165 80 150",W+3), "front"  # E, under bent fingers
    if state=="touch":  tx,ty=touch; return stroke(f"M{b[0]} {b[1]} Q{(b[0]+tx)/2+14:.0f} {ty+24} {tx} {ty}",W+2), "front"
    if state.startswith("peek"):  # tip shows between fingers at x
        x=float(state.split(":")[1]); return "", "peek:"+str(x)
    raise ValueError(state)

def hand(fingers, th, spread=True, touch_f=None, rot=0, back=False, flip=False, extra=""):
    """fingers: dict p,r,m,i -> state. th: thumb state."""
    BACKVIEW[0]=back
    touch=None
    if touch_f:
        b=BASE[touch_f]; touch=(b[0]+8, b[1]+34)
    behind=[]; front=[]
    for f in "prmi":
        s=fingers[f]
        a,bfr=finger(f,s,spread,touch if s=="touch" else None)
        behind.append(a); front.append(bfr)
    tsvg,layer=thumb(th,touch)
    palm=(f'<rect x="66" y="178" width="66" height="70" rx="22" fill="{SKIN}" stroke="{INK}" stroke-width="{OUT/2+2}"/>'
          f'<rect x="56" y="108" width="90" height="92" rx="34" fill="{SKIN}" stroke="{INK}" stroke-width="{OUT/2+2}"/>'
          f'<ellipse cx="100" cy="160" rx="34" ry="28" fill="url(#palmglow)"/>')
    crease = (f'<path d="M80 136 Q100 128 122 134" fill="none" stroke="{SHADE}" stroke-width="2" stroke-linecap="round" opacity=".7"/>' if back else
              f'<path d="M76 168 Q100 180 126 164" fill="none" stroke="{SHADE}" stroke-width="3.5" stroke-linecap="round"/>'
              f'<path d="M72 150 Q96 158 118 146" fill="none" stroke="{SHADE}" stroke-width="2.5" stroke-linecap="round" opacity=".7"/>')
    # cover finger bases inside palm
    cover=f'<rect x="60" y="112" width="82" height="86" rx="31" fill="{SKIN}"/><ellipse cx="100" cy="158" rx="32" ry="26" fill="url(#palmglow)"/>'
    body = "".join(behind) + (tsvg if layer=="back" else "") + palm + cover + crease
    peek=""
    if layer.startswith("peek"):
        x=float(layer.split(":")[1]); peek=f'<ellipse cx="{x}" cy="114" rx="9" ry="11" fill="{SKIN}" stroke="{INK}" stroke-width="5"/>'+tip_pad(x,110,5)
    body += "".join(front) + peek + (tsvg if layer=="front" else "")
    t=[]
    if flip or back: t.append("translate(200 0) scale(-1 1)")
    if rot >= 120: t.insert(0, "translate(0 -62) scale(0.92)")
    if rot: t.append(f"rotate({rot} 100 150)")
    g=f'<g transform="{" ".join(t)}">{body}</g>' if t else body
    return g+extra

DEFS=('<defs><linearGradient id="skin" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="250">'
      '<stop offset="0" stop-color="#FBE0CF"/><stop offset="1" stop-color="#F0C2A6"/></linearGradient>'
      '<radialGradient id="palmglow"><stop offset="0" stop-color="#FFF4EC" stop-opacity=".55"/><stop offset="1" stop-color="#FFF4EC" stop-opacity="0"/></radialGradient></defs>')
def svg(inner, vb="-30 -40 260 300"):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" width="540" height="620">{DEFS}<ellipse cx="100" cy="252" rx="62" ry="7" fill="#3B2620" opacity=".08"/>{inner}</svg>'

ARROWDEF=f'<defs><marker id="a" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="{ARROW}"/></marker></defs>'
def arrow(d): return ARROWDEF+f'<path d="{d}" fill="none" stroke="{ARROW}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#a)"/>'

def thick(d,w=30): return stroke(d,w)

# --- side-view special shapes ---
def C_shape():
    return thick("M150 70 Q70 40 60 130 Q66 200 150 196",30)+thick("M150 196 L132 186",24)
def O_shape():
    return thick("M140 80 Q60 60 62 140 Q70 205 135 190 Q160 170 140 80",28)
def pinch_shape():
    return (f'<rect x="40" y="150" width="70" height="80" rx="24" fill="{SKIN}" stroke="{INK}" stroke-width="5.5"/>'
            + thick("M70 160 Q110 110 170 120",28)+thick("M80 190 Q130 175 166 130",24)+tip_pad(166,124))

ALL_UP=dict(p="up",r="up",m="up",i="up")
BACKVIEW=[False]
FIST=dict(p="curl",r="curl",m="curl",i="curl")
def F(**k): d=dict(FIST); d.update(k); return d

HANDSHAPES={
 "flat":  hand(ALL_UP,"in",spread=False),
 "5":     hand(ALL_UP,"out"),
 "a":     hand(FIST,"side"),
 "s":     hand(FIST,"across"),
 "thumb": hand(FIST,"up"),
 "index": hand(F(i="up"),"across"),
 "v":     hand(F(i="up",m="up"),"across"),
 "h":     hand(F(i="up",m="up"),"across",spread=False,rot=-90,flip=True),
 "w":     hand(F(i="up",m="up",r="up"),"across"),
 "4":     hand(ALL_UP,"in"),
 "t":     hand(FIST,"peek:121"),
 "bent":  hand(dict(p="bent",r="bent",m="bent",i="bent"),"in",spread=False),
 "claw":  hand(dict(p="hook",r="hook",m="hook",i="hook"),"hook"),
 "pinch": pinch_shape(),
 "middle":hand(dict(p="up",r="up",m="bent",i="up"),"out"),
}
LETTERS={
 "a":hand(FIST,"side"), "b":hand(ALL_UP,"in",spread=False), "c":C_shape(),
 "d":hand(F(i="up",m="touch"),"touch",touch_f="m"),
 "e":hand(dict(p="hooklow",r="hooklow",m="hooklow",i="hooklow"),"low",spread=False),
 "f":hand(dict(p="up",r="up",m="up",i="touch"),"touch",touch_f="i"),
 "g":hand(F(i="up"),"out",spread=False,rot=-90,flip=True),
 "h":hand(F(i="up",m="up"),"across",spread=False,rot=-90,flip=True),
 "i":hand(F(p="up"),"across"),
 "j":hand(F(p="up"),"across",extra=arrow("M60 40 L60 80 Q60 110 30 100")),
 "k":hand(F(i="up",m="up"),"peek:121"),
 "l":hand(F(i="up"),"out"),
 "m":hand(FIST,"peek:81"), "n":hand(FIST,"peek:101"), "o":O_shape(),
 "p":hand(F(i="up",m="up"),"peek:121",rot=150),
 "q":hand(F(i="up"),"out",spread=False,rot=170),
 "r":hand(F(i="crossL",m="crossR"),"across",spread=False),
 "s":hand(FIST,"across"), "t":hand(FIST,"peek:121"),
 "u":hand(F(i="up",m="up"),"across",spread=False),
 "v":hand(F(i="up",m="up"),"across"),
 "w":hand(F(i="up",m="up",r="up"),"across"),
 "x":hand(F(i="hook"),"across"),
 "y":hand(F(p="up"),"out"),
 "z":hand(F(i="up"),"across",extra=arrow("M150 30 L190 30 L150 70 L190 70")),
}
NUMS={
 1:hand(F(i="up"),"across",back=True),
 2:hand(F(i="up",m="up"),"across",back=True),
 3:hand(F(i="up",m="up"),"out",back=True),
 4:hand(ALL_UP,"in",back=True),
 5:hand(ALL_UP,"out",back=True),
 6:hand(dict(p="touch",r="up",m="up",i="up"),"touch",touch_f="p"),
 7:hand(dict(p="up",r="touch",m="up",i="up"),"touch",touch_f="r"),
 8:hand(dict(p="up",r="up",m="touch",i="up"),"touch",touch_f="m"),
 9:hand(dict(p="up",r="up",m="up",i="touch"),"touch",touch_f="i"),
 10:hand(FIST,"up",extra=arrow("M170 40 Q190 55 170 70")+arrow("M130 40 Q110 55 130 70")),
 11:hand(F(i="up"),"across",back=True,extra=arrow("M150 120 Q175 85 160 45")),
 12:hand(F(i="up",m="up"),"across",back=True,extra=arrow("M155 120 Q180 85 165 45")),
 13:hand(F(i="bent",m="bent"),"out",back=True,extra=arrow("M100 20 L100 60")),
 14:hand(dict(p="bent",r="bent",m="bent",i="bent"),"in",spread=False,back=True,extra=arrow("M100 30 L100 70")),
 15:hand(dict(p="bent",r="bent",m="bent",i="bent"),"out",spread=False,back=True,extra=arrow("M100 30 L100 70")),
 16:hand(dict(p="touch",r="up",m="up",i="up"),"touch",touch_f="p",extra=arrow("M40 210 Q100 250 160 210")),
 17:hand(dict(p="up",r="touch",m="up",i="up"),"touch",touch_f="r",extra=arrow("M40 210 Q100 250 160 210")),
 18:hand(dict(p="up",r="up",m="touch",i="up"),"touch",touch_f="m",extra=arrow("M40 210 Q100 250 160 210")),
 19:hand(dict(p="up",r="up",m="up",i="touch"),"touch",touch_f="i",extra=arrow("M40 210 Q100 250 160 210")),
 20:hand(F(i="up"),"out",extra=arrow("M168 70 Q170 105 150 112")),
}
import pathlib
root=str(pathlib.Path(__file__).resolve().parent.parent / "images")
for k,v in HANDSHAPES.items(): open(f"{root}/handshapes/{k}.svg","w").write(svg(v))
for k,v in LETTERS.items(): open(f"{root}/letters/{k}.svg","w").write(svg(v))
for k,v in NUMS.items(): open(f"{root}/numbers/{k}.svg","w").write(svg(v))
print("ok")
