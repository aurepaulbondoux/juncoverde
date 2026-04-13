import { useState, useCallback, useRef, useEffect } from "react";

// ── Pantone TCX ───────────────────────────────────────────────────────────────
const PANTONE_TCX = [
  {codigo:"11-0601 TCX",nombre:"Blanc de Blanc",  hex:"#F2EFE4",familia:"neutros"},
  {codigo:"11-0602 TCX",nombre:"Bright White",    hex:"#F4F2EC",familia:"neutros"},
  {codigo:"12-0104 TCX",nombre:"Whitecap Gray",   hex:"#E8E4D9",familia:"neutros"},
  {codigo:"14-0000 TCX",nombre:"Oyster Mushroom", hex:"#CEC8B8",familia:"neutros"},
  {codigo:"15-0000 TCX",nombre:"Aluminium",       hex:"#B8B4A8",familia:"neutros"},
  {codigo:"17-0000 TCX",nombre:"Steeple Gray",    hex:"#888480",familia:"neutros"},
  {codigo:"18-0000 TCX",nombre:"Quiet Shade",     hex:"#706C68",familia:"neutros"},
  {codigo:"19-0303 TCX",nombre:"Jet Black",       hex:"#2A2926",familia:"neutros"},
  {codigo:"12-0712 TCX",nombre:"Vanilla Custard", hex:"#F0DFB4",familia:"tierra"},
  {codigo:"13-0858 TCX",nombre:"Sunlight",        hex:"#F5D76E",familia:"tierra"},
  {codigo:"15-1062 TCX",nombre:"Saffron",         hex:"#F4A623",familia:"tierra"},
  {codigo:"16-1325 TCX",nombre:"Sandstorm",       hex:"#C8A882",familia:"tierra"},
  {codigo:"16-1334 TCX",nombre:"Pale Gold",       hex:"#D4A96A",familia:"tierra"},
  {codigo:"17-1044 TCX",nombre:"Caramel",         hex:"#C4813A",familia:"tierra"},
  {codigo:"18-1048 TCX",nombre:"Adobe",           hex:"#B86A38",familia:"tierra"},
  {codigo:"18-1142 TCX",nombre:"Leather Brown",   hex:"#A05C30",familia:"tierra"},
  {codigo:"18-1350 TCX",nombre:"Autumn Maple",    hex:"#B85C3A",familia:"tierra"},
  {codigo:"19-1118 TCX",nombre:"Coffee Bean",     hex:"#5A3820",familia:"tierra"},
  {codigo:"19-1217 TCX",nombre:"Bracken",         hex:"#6A4030",familia:"tierra"},
  {codigo:"19-1220 TCX",nombre:"Chocolate Torte", hex:"#4A2C1E",familia:"tierra"},
  {codigo:"16-1546 TCX",nombre:"Peach Amber",     hex:"#E8885A",familia:"calidos"},
  {codigo:"17-1444 TCX",nombre:"Brandied Apricot",hex:"#D4704A",familia:"calidos"},
  {codigo:"18-1244 TCX",nombre:"Terracotta",      hex:"#B85C42",familia:"calidos"},
  {codigo:"18-1454 TCX",nombre:"Autumn Leaves",   hex:"#C05030",familia:"calidos"},
  {codigo:"19-1557 TCX",nombre:"Ketchup",         hex:"#8C2A1E",familia:"calidos"},
  {codigo:"18-1630 TCX",nombre:"Dusty Cedar",     hex:"#C07868",familia:"calidos"},
  {codigo:"18-1629 TCX",nombre:"Old Rose",        hex:"#C08878",familia:"calidos"},
  {codigo:"19-1723 TCX",nombre:"Marsala",         hex:"#984040",familia:"calidos"},
  {codigo:"18-1737 TCX",nombre:"Cranberry",       hex:"#A83848",familia:"calidos"},
  {codigo:"14-0217 TCX",nombre:"Pistachio Green", hex:"#C8D8A8",familia:"verdes"},
  {codigo:"15-0336 TCX",nombre:"Greenery",        hex:"#88A840",familia:"verdes"},
  {codigo:"17-0145 TCX",nombre:"Foliage",         hex:"#607830",familia:"verdes"},
  {codigo:"18-0430 TCX",nombre:"Dusty Olive",     hex:"#788050",familia:"verdes"},
  {codigo:"18-0422 TCX",nombre:"Fern",            hex:"#708060",familia:"verdes"},
  {codigo:"19-0419 TCX",nombre:"Dill",            hex:"#506040",familia:"verdes"},
  {codigo:"19-0622 TCX",nombre:"Cypress",         hex:"#485A38",familia:"verdes"},
  {codigo:"14-4318 TCX",nombre:"Baby Blue",       hex:"#A8C8DC",familia:"frios"},
  {codigo:"16-4132 TCX",nombre:"Cerulean",        hex:"#80A8C8",familia:"frios"},
  {codigo:"17-4328 TCX",nombre:"Dusty Blue",      hex:"#6890B0",familia:"frios"},
  {codigo:"18-4334 TCX",nombre:"Copen Blue",      hex:"#5078A0",familia:"frios"},
  {codigo:"19-4241 TCX",nombre:"Bering Sea",      hex:"#386088",familia:"frios"},
  {codigo:"19-4150 TCX",nombre:"Naval",           hex:"#283858",familia:"frios"},
  {codigo:"18-4735 TCX",nombre:"Deep Peacock",    hex:"#3A7080",familia:"frios"},
  {codigo:"18-5020 TCX",nombre:"Blue Spruce",     hex:"#507870",familia:"frios"},
  {codigo:"18-5128 TCX",nombre:"Teal",            hex:"#3A7878",familia:"frios"},
  {codigo:"19-5220 TCX",nombre:"Deep Teal",       hex:"#284840",familia:"frios"},
  {codigo:"14-3812 TCX",nombre:"Pastel Lilac",    hex:"#D0C0D8",familia:"violetas"},
  {codigo:"15-3817 TCX",nombre:"Lavender",        hex:"#B8A8C8",familia:"violetas"},
  {codigo:"17-3628 TCX",nombre:"Violet Ice",      hex:"#9888B0",familia:"violetas"},
  {codigo:"18-3737 TCX",nombre:"Amethyst Orchid", hex:"#9870A8",familia:"violetas"},
  {codigo:"19-3748 TCX",nombre:"Violet",          hex:"#604880",familia:"violetas"},
  {codigo:"13-2010 TCX",nombre:"Crystal Pink",    hex:"#F0D0C8",familia:"rosas"},
  {codigo:"16-1723 TCX",nombre:"Peach Nougat",    hex:"#D8A090",familia:"rosas"},
  {codigo:"17-1927 TCX",nombre:"Blush",           hex:"#D09090",familia:"rosas"},
  {codigo:"18-2043 TCX",nombre:"Pink Lemonade",   hex:"#C86080",familia:"rosas"},
  {codigo:"19-2041 TCX",nombre:"Raspberry",       hex:"#A02858",familia:"rosas"},
];

const FAMILIAS_PANTONE = [
  {id:"todos",label:"Todos"},{id:"neutros",label:"Neutros"},{id:"tierra",label:"Tierra"},
  {id:"calidos",label:"Calidos"},{id:"verdes",label:"Verdes"},{id:"frios",label:"Frios"},
  {id:"violetas",label:"Violetas"},{id:"rosas",label:"Rosas"},
];

// ── Datos vacíos para beta ────────────────────────────────────────────────────
const COLORES_INICIALES = [];
const LOTES_INICIALES   = [];

const PASOS = [
  {titulo:"Preparacion de la lana",    tiempo:"20-30 min", desc:"Remojar las madejas en agua tibia al menos 20 minutos antes del bano. El agua debe penetrar completamente la fibra para lograr un tenido uniforme. Usar agua sin cloro, ideal agua declorada o de lluvia."},
  {titulo:"Preparacion del mordiente", tiempo:"30-45 min", desc:"Disolver el mordiente (sulfato de amonio o alumbre) en agua caliente por separado. La proporcion estandar es 15-20% del peso de la lana. Incorporar la lana y subir la temperatura gradualmente hasta 80 grados."},
  {titulo:"Preparacion del tinte",     tiempo:"15 min",    desc:"Disolver el tinte en agua caliente (no hirviendo). Para tintes acidos Lanaset usar un chorrito de vinagre o acido acetico diluido para acidificar el bano a pH 4-5. Para tintes naturales preparar la decoccion con anterioridad."},
  {titulo:"Entrada al bano",           tiempo:"10-15 min", desc:"Incorporar la lana mordentada al bano de tinte. La temperatura inicial no debe superar los 60 grados para evitar el choque termico. Subir la temperatura de forma gradual, no mas de 3 grados por minuto."},
  {titulo:"Desarrollo del color",      tiempo:"45-60 min", desc:"Mantener la temperatura entre 82-88 grados segun la tecnica. Mover las madejas suavemente cada 5-10 minutos para asegurar la uniformidad. No agitar bruscamente, puede fieltrar la lana. Controlar el pH con tiras reactivas."},
  {titulo:"Enjuague y lavado",         tiempo:"20-30 min", desc:"Dejar enfriar el bano antes de retirar la lana. El choque termico puede causar fieltrado. Enjuagar con agua a temperatura similar bajando de a poco. El ultimo enjuague puede llevar unas gotas de vinagre para cerrar la cuticula."},
  {titulo:"Secado y registro",         tiempo:"12-24 h",   desc:"Escurrir sin torcer, envolver en toalla y presionar. Colgar a la sombra en lugar con buena ventilacion. Una vez seco registrar el lote: pH final, temperatura maxima, agotamiento del bano, observaciones de color."},
];

const TECNICAS = [
  {
    id:"acido", nombre:"Tinte acido Lanaset", badge:"acido", colorAcento:"#1D9E75", bgAcento:"#E1F5EE", icono:"⬡", consejoTipo:"proveedor",
    descripcion:"La tecnica de mayor reproducibilidad. Los tintes Lanaset son sinteticos, tienen excelente solidez a la luz y al lavado, y permiten mezclas precisas.",
    coloresPaleta:[],
    parametros:[["pH del bano","4.0 - 5.0"],["Temperatura","85 - 90°C"],["Tiempo en bano","45 - 60 min"],["Mordiente","Sulfato de amonio 15-20% OPF"],["Proporcion tinte","1-4% OPF"],["Agotamiento","Bano claro al final"]],
    consejo:"Los Lanaset se importan desde Dharma Trading o PRO Chemical (EEUU). Un frasco de 28 g alcanza para 500 g a 1 kg de lana segun la profundidad del color.",
  },
  {
    id:"natural", nombre:"Tinte natural", badge:"natural", colorAcento:"#27500A", bgAcento:"#EAF3DE", icono:"❧", consejoTipo:"insumo",
    descripcion:"Para colores exclusivos de temporada. Mayor variabilidad entre lotes, pero produce tonos unicos imposibles de replicar con tintes sinteticos.",
    coloresPaleta:[],
    parametros:[["pH del bano","5.0 - 6.0"],["Temperatura","75 - 82°C"],["Tiempo en bano","45 - 90 min"],["Mordiente","Alumbre 15% OPF"],["Material vegetal","100-200% OPF"],["Mordentado","Previo al bano"]],
    consejo:"Cascaras de cebolla del Mercado Agricola (casi sin costo). Para lavanda: herboristeria del Centro o cultivo propio.",
  },
  {
    id:"semis", nombre:"Semis", badge:"acido", colorAcento:"#3D5C5A", bgAcento:"#E6F1FB", icono:"◈", consejoTipo:"tecnica",
    descripcion:"Variacion del tinte acido que produce efectos de profundidad y variacion tonal dentro de una misma madeja.",
    coloresPaleta:[],
    parametros:[["pH del bano","4.5 - 5.5"],["Temperatura","82 - 88°C"],["Tiempo en bano","50 - 70 min"],["Mordiente","Sulfato de amonio 15% OPF"],["Tecnica clave","Distribucion irregular"],["Agotamiento","Parcial intencional"]],
    consejo:"La clave es no homogeneizar el tinte en el bano. Se aplica en zonas para lograr la variacion tonal.",
  },
];

const PROVEEDORES = [
  {cat:"tinte",   nombre:"Dharma Trading Co.",                  pais:"EEUU",              web:"dharmatrading.com",     tag:"Tintes Lanaset", urgencia:"Ruta recomendada", descripcion:"Principal proveedor para tintes Lanaset. Catalogo completo, envio internacional. Frascos de 14-28 g, entran sin problemas como carta o courier."},
  {cat:"tinte",   nombre:"PRO Chemical and Dye",                pais:"EEUU",              web:"prochemicalanddye.com", tag:"Tintes Lanaset", urgencia:"Alternativa",      descripcion:"Alternativa a Dharma con catalogo similar. Buenos precios en cantidades mayores. Ideal para pedidos conjuntos de varios colores base."},
  {cat:"quimica", nombre:"DIU Drogueria Industrial Uruguaya",   pais:"Uruguay",           web:"diu.com.uy",            tag:"Quimica local",  urgencia:"Principal local",  descripcion:"Referencia historica del sector desde 1935. Alumbre, sulfato de amonio, acido acetico. Venta al por menor, envios a todo el pais."},
  {cat:"quimica", nombre:"AFranco",                             pais:"Uruguay",           web:"afranco.com.uy",        tag:"Quimica local",  urgencia:"Delivery gratis",  descripcion:"Alternativa moderna. Envio gratuito a domicilio en Montevideo en compras mayores a $1.500 UY. Buen stock de mordientes."},
  {cat:"quimica", nombre:"Drogueria 8",                         pais:"Uruguay",           web:"—",                     tag:"Quimica local",  urgencia:"Complemento",      descripcion:"Para tiras de pH, acido acetico y pequenas cantidades de mordiente. Util para reposicion rapida."},
  {cat:"natural", nombre:"Mercado Agricola de Montevideo",      pais:"Uruguay",           web:"—",                     tag:"Tinte natural",  urgencia:"Casi sin costo",   descripcion:"Coordinando con verduleros se consigue cascaras de cebolla seca casi sin costo. Ideal para colores tierra y dorados."},
  {cat:"natural", nombre:"Herboristeria del Centro",            pais:"Uruguay",           web:"—",                     tag:"Lavanda",        urgencia:"Explorar",         descripcion:"Para lavanda a granel. Explorar opciones en Ciudad Vieja y barrio Centro. Alternativa: cultivar una pequena cantidad propia."},
  {cat:"natural", nombre:"MercadoLibre UY / AR",                pais:"Uruguay/Argentina", web:"mercadolibre.com.uy",   tag:"Online",         urgencia:"Complemento",      descripcion:"Canal util para alumbre y materiales vegetales deshidratados. Verificar vendedores con buen historial. Envios desde Argentina en 3-5 dias."},
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmtDate = d => { const [y,m,dia] = d.split("-"); return `${dia}/${m}/${y}`; };
const TIPO_LABEL   = {exc:"Exclusivo", base:"Base temp.", neu:"Neutro"};
const FAMILIA_LABEL = {neutros:"Neutros", tierra:"Tierra", frios:"Frios", calidos:"Calidos", verdes:"Verdes", violetas:"Violetas", rosas:"Rosas"};
const isDark = hex => parseInt(hex.replace("#",""),16) < 0x888888;

const S = {
  card:       {background:"#fff",border:"0.5px solid rgba(0,0,0,0.12)",borderRadius:12,padding:"1rem 1.25rem",marginBottom:"0.75rem"},
  label:      {fontSize:11,fontWeight:500,color:"#888780",textTransform:"uppercase",letterSpacing:"0.05em",margin:"0 0 8px"},
  metric:     {background:"#F1EFE8",borderRadius:8,padding:"10px 12px"},
  input:      {width:"100%",padding:"8px 10px",border:"0.5px solid rgba(0,0,0,0.18)",borderRadius:8,fontSize:13,outline:"none",boxSizing:"border-box",background:"#fff",color:"#2C2C2A"},
  select:     {width:"100%",padding:"8px 10px",border:"0.5px solid rgba(0,0,0,0.18)",borderRadius:8,fontSize:13,outline:"none",boxSizing:"border-box",background:"#fff",color:"#2C2C2A"},
  btn:        {padding:"8px 16px",borderRadius:8,border:"0.5px solid rgba(0,0,0,0.18)",background:"transparent",cursor:"pointer",fontSize:13,fontWeight:500,color:"#2C2C2A"},
  btnPrimary: {padding:"8px 16px",borderRadius:8,border:"0.5px solid #1D9E75",background:"#E1F5EE",cursor:"pointer",fontSize:13,fontWeight:500,color:"#085041",width:"100%",marginTop:8},
};

function bdg(v) {
  const m = {
    ok:{background:"#E1F5EE",color:"#085041"}, low:{background:"#FAEEDA",color:"#633806"},
    out:{background:"#FCEBEB",color:"#791F1F"}, exc:{background:"#FAEEDA",color:"#633806"},
    base:{background:"#E1F5EE",color:"#085041"}, neu:{background:"#F1EFE8",color:"#444441"},
    lote:{background:"#E6F1FB",color:"#0C447C"}, natural:{background:"#EAF3DE",color:"#27500A"},
    acido:{background:"#E1F5EE",color:"#085041"},
  };
  return {...(m[v]||m.neu), fontSize:10, padding:"2px 8px", borderRadius:3, fontWeight:500, display:"inline-block"};
}

function FRow({ label, children }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
      <label style={{fontSize:13,color:"#888780",minWidth:140}}>{label}</label>
      {children}
    </div>
  );
}

function EmptyState({ mensaje, accion, onAccion }) {
  return (
    <div style={{textAlign:"center",padding:"3rem 1rem",color:"#888780"}}>
      <p style={{fontSize:32,margin:"0 0 12px"}}>○</p>
      <p style={{fontSize:14,margin:"0 0 8px",color:"#5F5E5A"}}>{mensaje}</p>
      {accion && <button style={{...S.btn,marginTop:8,color:"#1D9E75",border:"0.5px solid #1D9E75"}} onClick={onAccion}>{accion}</button>}
    </div>
  );
}

// ── Panel ─────────────────────────────────────────────────────────────────────
function Panel({ colores, lotes, onTab }) {
  const sinStock   = colores.filter(c => c.stock === 0).length;
  const totalStock = colores.reduce((s,c) => s + c.stock, 0);
  const ultimos    = [...lotes].reverse().slice(0,3);
  const vacio      = colores.length === 0 && lotes.length === 0;

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:"1.25rem"}}>
        {[
          {label:"Colores activos",   val:colores.length},
          {label:"Lotes registrados", val:lotes.length},
          {label:"Madejas en stock",  val:`${totalStock} uds`, color:"#085041"},
          {label:"Sin stock",         val:sinStock, color:sinStock>0?"#A32D2D":"#085041"},
        ].map(m => (
          <div key={m.label} style={S.metric}>
            <p style={{fontSize:11,color:"#888780",margin:"0 0 4px"}}>{m.label}</p>
            <p style={{fontSize:20,fontWeight:500,margin:0,color:m.color||"#2C2C2A"}}>{m.val}</p>
          </div>
        ))}
      </div>

      {vacio ? (
        <div style={{...S.card,background:"#F8F7F3",border:"0.5px dashed rgba(0,0,0,0.15)"}}>
          <p style={{...S.label,margin:"0 0 12px"}}>Por donde empezar</p>
          {[
            {n:"1", txt:"Agregar los colores de tu paleta en la pestana Catalogo"},
            {n:"2", txt:"Registrar los primeros lotes de tenido en la pestana Lotes"},
            {n:"3", txt:"Explorar colores Pantone TCX y calcular formulas con IA"},
            {n:"4", txt:"Usar la Calculadora de costos para definir precios de venta"},
          ].map(s => (
            <div key={s.n} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10}}>
              <div style={{width:22,height:22,borderRadius:"50%",background:"#E1F5EE",border:"0.5px solid #1D9E75",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:600,color:"#085041",flexShrink:0}}>{s.n}</div>
              <p style={{fontSize:13,color:"#5F5E5A",margin:"2px 0 0",lineHeight:1.5}}>{s.txt}</p>
            </div>
          ))}
        </div>
      ) : (
        <>
          <p style={S.label}>Stock por color</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:"1.25rem"}}>
            {colores.map(c => (
              <div key={c.id} onClick={() => onTab(1)} title={c.nombre} style={{width:80,borderRadius:10,overflow:"hidden",border:"0.5px solid rgba(0,0,0,0.1)",cursor:"pointer"}}>
                <div style={{height:44,background:c.hex}} />
                <div style={{padding:"4px 6px",background:"#fff"}}>
                  <p style={{fontSize:10,fontWeight:500,margin:"0 0 1px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.nombre}</p>
                  <p style={{fontSize:10,margin:0,color:c.stock===0?"#A32D2D":c.stock<=3?"#854F0B":"#888780"}}>{c.stock===0?"Sin stock":`${c.stock} uds`}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={S.label}>Ultimos lotes</p>
          {ultimos.length===0
            ? <p style={{fontSize:13,color:"#888780"}}>No hay lotes registrados todavia.</p>
            : ultimos.map(l => {
                const c = colores.find(x => x.id===l.colorId);
                return (
                  <div key={l.id} style={S.card}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <div style={{width:12,height:12,borderRadius:"50%",background:c?.hex,border:"0.5px solid rgba(0,0,0,0.1)"}} />
                        <span style={{fontSize:13,fontWeight:500}}>{l.id} — {c?.nombre}</span>
                      </div>
                      <span style={bdg("lote")}>{l.madejas} madejas</span>
                    </div>
                    <p style={{fontSize:12,color:"#888780",margin:0}}>{fmtDate(l.fecha)} · {l.artesana} · pH {l.ph} · {l.temp}°C</p>
                    <p style={{fontSize:12,color:"#B4B2A9",margin:"2px 0 8px",fontStyle:"italic"}}>{l.notas}</p>
                    <div style={{height:4,borderRadius:2,background:"#F1EFE8",overflow:"hidden"}}>
                      <div style={{height:"100%",borderRadius:2,background:"#1D9E75",width:`${Math.min(100,Math.round(l.madejas/20*100))}%`}} />
                    </div>
                  </div>
                );
              })
          }
        </>
      )}
    </div>
  );
}

// ── Catalogo ──────────────────────────────────────────────────────────────────
function Catalogo({ colores, onNuevoColor }) {
  const [q,setQ] = useState("");
  const filtrados = colores.filter(c =>
    c.nombre.toLowerCase().includes(q.toLowerCase()) ||
    (c.familia||"").includes(q.toLowerCase())
  );
  const stockBadge = s => s===0?"out":s<=3?"low":"ok";
  const stockLabel = s => s===0?"Sin stock":s<=3?`${s} uds - bajo`:`${s} uds`;
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:"1rem"}}>
        <input style={{...S.input,flex:1}} placeholder="Buscar color o familia..." value={q} onChange={e=>setQ(e.target.value)} />
        <button style={S.btn} onClick={onNuevoColor}>+ Nuevo color</button>
      </div>
      {colores.length===0
        ? <EmptyState mensaje="Todavia no hay colores en el catalogo." accion="+ Agregar primer color" onAccion={onNuevoColor} />
        : (
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead>
              <tr>{["","Nombre","Familia","Tecnica","Tipo","Stock"].map(h => (
                <th key={h} style={{textAlign:"left",padding:"6px 10px",fontSize:11,fontWeight:500,color:"#888780",borderBottom:"0.5px solid rgba(0,0,0,0.1)",textTransform:"uppercase",letterSpacing:"0.04em"}}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {filtrados.map(c => (
                <tr key={c.id}>
                  <td style={{padding:"9px 10px"}}><div style={{width:14,height:14,borderRadius:"50%",background:c.hex,border:"0.5px solid rgba(0,0,0,0.1)"}} /></td>
                  <td style={{padding:"9px 10px",fontWeight:500}}>{c.nombre}</td>
                  <td style={{padding:"9px 10px",color:"#888780"}}>{FAMILIA_LABEL[c.familia]||c.familia}</td>
                  <td style={{padding:"9px 10px",color:"#888780",fontSize:12}}>{c.tecnica}</td>
                  <td style={{padding:"9px 10px"}}><span style={bdg(c.tipo)}>{TIPO_LABEL[c.tipo]}</span></td>
                  <td style={{padding:"9px 10px"}}><span style={bdg(stockBadge(c.stock))}>{stockLabel(c.stock)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </div>
  );
}

// ── Lotes ─────────────────────────────────────────────────────────────────────
function Lotes({ lotes, colores, onNuevoLote }) {
  const [q,setQ] = useState("");
  const filtrados = [...lotes].reverse().filter(l => {
    const c = colores.find(x => x.id===l.colorId);
    return l.id.toLowerCase().includes(q.toLowerCase()) ||
      (c&&c.nombre.toLowerCase().includes(q.toLowerCase())) ||
      l.artesana.toLowerCase().includes(q.toLowerCase());
  });
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:"1rem"}}>
        <input style={{...S.input,flex:1}} placeholder="Buscar por color, lote o artesana..." value={q} onChange={e=>setQ(e.target.value)} />
        <button style={S.btn} onClick={onNuevoLote}>+ Registrar lote</button>
      </div>
      {lotes.length===0
        ? <EmptyState mensaje="Todavia no hay lotes registrados." accion="+ Registrar primer lote" onAccion={onNuevoLote} />
        : filtrados.map(l => {
            const c = colores.find(x => x.id===l.colorId);
            return (
              <div key={l.id} style={S.card}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:14,height:14,borderRadius:"50%",background:c?.hex,border:"0.5px solid rgba(0,0,0,0.1)"}} />
                    <span style={{fontWeight:500,fontSize:13}}>{l.id}</span>
                    <span style={{fontSize:12,color:"#888780"}}>— {c?.nombre}</span>
                  </div>
                  <span style={bdg("lote")}>{l.madejas} madejas</span>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,marginBottom:4}}>
                  {[`Artesana: ${l.artesana}`,`Fecha: ${fmtDate(l.fecha)}`,`Peso: ${l.pesoG}g`,`Tinte: ${l.tinteG}g`,`Mordiente: ${l.mordienteG}g`,`pH ${l.ph} · ${l.temp}°C`].map(txt => (
                    <p key={txt} style={{fontSize:12,color:"#888780",margin:0}}>{txt}</p>
                  ))}
                </div>
                <p style={{fontSize:12,color:"#B4B2A9",margin:"4px 0 8px",fontStyle:"italic"}}>{l.notas}</p>
                <div style={{height:4,borderRadius:2,background:"#F1EFE8",overflow:"hidden"}}>
                  <div style={{height:"100%",borderRadius:2,background:"#1D9E75",width:`${Math.min(100,Math.round(l.madejas/20*100))}%`}} />
                </div>
              </div>
            );
          })
      }
    </div>
  );
}

// ── Nuevo Lote ────────────────────────────────────────────────────────────────
function NuevoLote({ colores, lotes, onGuardar }) {
  const [form,setForm] = useState({colorId:"",artesana:"",fecha:new Date().toISOString().split("T")[0],madejas:10,pesoG:1000,tinteG:28,mordienteG:150,ph:4.5,temp:85,notas:""});
  const set = (k,v) => setForm(f => ({...f,[k]:v}));
  const colorSel = colores.find(c => c.id===form.colorId);
  const guardar = () => {
    if (!form.colorId) { alert("Elegi un color primero."); return; }
    if (!form.artesana.trim()) { alert("Ingresa el nombre de la artesana."); return; }
    const id = `L-${new Date().getFullYear()}-${String(lotes.length+1).padStart(3,"0")}`;
    onGuardar({...form,id,madejas:Number(form.madejas),pesoG:Number(form.pesoG),tinteG:Number(form.tinteG),mordienteG:Number(form.mordienteG),ph:Number(form.ph),temp:Number(form.temp)});
  };
  return (
    <div>
      <p style={S.label}>Registrar nuevo lote de tenido</p>
      {colores.length===0
        ? <div style={{...S.card,background:"#FAEEDA",border:"0.5px solid #E8C880"}}><p style={{fontSize:13,color:"#633806",margin:0}}>Primero agregar al menos un color en el Catalogo.</p></div>
        : (
          <div style={S.card}>
            <FRow label="Color">
              <div style={{display:"flex",gap:8,flex:1,alignItems:"center"}}>
                <select style={{...S.select,flex:1}} value={form.colorId} onChange={e=>set("colorId",e.target.value)}>
                  <option value="">— elegi un color —</option>
                  {colores.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
                {colorSel && <div style={{width:24,height:24,borderRadius:"50%",background:colorSel.hex,border:"0.5px solid rgba(0,0,0,0.1)",flexShrink:0}} />}
              </div>
            </FRow>
            <FRow label="Fecha"><input style={S.input} type="date" value={form.fecha} onChange={e=>set("fecha",e.target.value)} /></FRow>
            <FRow label="Artesana"><input style={S.input} placeholder="Nombre" value={form.artesana} onChange={e=>set("artesana",e.target.value)} /></FRow>
            <FRow label="Madejas producidas"><input style={S.input} type="number" min={1} max={50} value={form.madejas} onChange={e=>set("madejas",e.target.value)} /></FRow>
            <FRow label="Peso lana (g)"><input style={S.input} type="number" min={100} step={50} value={form.pesoG} onChange={e=>set("pesoG",e.target.value)} /></FRow>
            <FRow label="Tinte usado (g)"><input style={S.input} type="number" min={0} step={0.5} value={form.tinteG} onChange={e=>set("tinteG",e.target.value)} /></FRow>
            <FRow label="Mordiente (g)"><input style={S.input} type="number" min={0} step={5} value={form.mordienteG} onChange={e=>set("mordienteG",e.target.value)} /></FRow>
            <FRow label="pH final del bano"><input style={S.input} type="number" min={2} max={7} step={0.1} value={form.ph} onChange={e=>set("ph",e.target.value)} /></FRow>
            <FRow label="Temperatura max (°C)"><input style={S.input} type="number" min={60} max={95} value={form.temp} onChange={e=>set("temp",e.target.value)} /></FRow>
            <FRow label="Notas"><input style={S.input} placeholder="Observaciones del lote..." value={form.notas} onChange={e=>set("notas",e.target.value)} /></FRow>
            <button style={S.btnPrimary} onClick={guardar}>Registrar lote</button>
          </div>
        )
      }
    </div>
  );
}

// ── Nuevo Color ───────────────────────────────────────────────────────────────
function NuevoColor({ onGuardar, onCancelar }) {
  const [form,setForm] = useState({nombre:"",hex:"#9C6A40",familia:"tierra",tecnica:"Tinte acido",tipo:"base",tintePrincipal:"",tinteSecundario:"",mordiente:"Sulfato de amonio",proporcion:"2%",temperatura:"85°C",tiempo:"45 min",notas:""});
  const set = (k,v) => setForm(f => ({...f,[k]:v}));
  const guardar = () => {
    if (!form.nombre.trim()) { alert("Ingresa un nombre para el color."); return; }
    onGuardar({...form,id:`c${Date.now()}`,stock:0});
  };
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}}>
        <p style={{...S.label,margin:0}}>Nuevo color al catalogo</p>
        <button style={S.btn} onClick={onCancelar}>← Volver</button>
      </div>
      <div style={S.card}>
        <FRow label="Nombre">
          <div style={{display:"flex",gap:8,flex:1,alignItems:"center"}}>
            <input style={{...S.input,flex:1}} placeholder="Ej: Terracota campo" value={form.nombre} onChange={e=>set("nombre",e.target.value)} />
            <div style={{width:28,height:28,borderRadius:"50%",background:form.hex,border:"0.5px solid rgba(0,0,0,0.1)",flexShrink:0}} />
          </div>
        </FRow>
        <FRow label="Color (hex)"><input style={S.input} type="color" value={form.hex} onChange={e=>set("hex",e.target.value)} /></FRow>
        <FRow label="Familia">
          <select style={S.select} value={form.familia} onChange={e=>set("familia",e.target.value)}>
            <option value="tierra">Tierra y natural</option>
            <option value="frios">Frios y profundos</option>
            <option value="calidos">Calidos y vivos</option>
            <option value="neutros">Neutros permanentes</option>
          </select>
        </FRow>
        <FRow label="Tecnica">
          <select style={S.select} value={form.tecnica} onChange={e=>set("tecnica",e.target.value)}>
            <option value="Tinte acido">Tinte acido</option>
            <option value="Tinte natural">Tinte natural</option>
            <option value="Semis">Semis</option>
            <option value="Sin tenir">Sin tenir</option>
          </select>
        </FRow>
        <FRow label="Tipo">
          <select style={S.select} value={form.tipo} onChange={e=>set("tipo",e.target.value)}>
            <option value="base">Base de temporada</option>
            <option value="exc">Color exclusivo</option>
            <option value="neu">Neutro permanente</option>
          </select>
        </FRow>
        <FRow label="Tinte principal"><input style={S.input} placeholder="Ej: Rojo Lanaset" value={form.tintePrincipal} onChange={e=>set("tintePrincipal",e.target.value)} /></FRow>
        <FRow label="Tinte secundario"><input style={S.input} placeholder="Si aplica mezcla" value={form.tinteSecundario} onChange={e=>set("tinteSecundario",e.target.value)} /></FRow>
        <FRow label="Mordiente"><input style={S.input} value={form.mordiente} onChange={e=>set("mordiente",e.target.value)} /></FRow>
        <FRow label="Proporcion tinte"><input style={S.input} placeholder="% del peso de lana" value={form.proporcion} onChange={e=>set("proporcion",e.target.value)} /></FRow>
        <FRow label="Temperatura"><input style={S.input} placeholder="Ej: 85°C" value={form.temperatura} onChange={e=>set("temperatura",e.target.value)} /></FRow>
        <FRow label="Tiempo en bano"><input style={S.input} placeholder="Ej: 45 min" value={form.tiempo} onChange={e=>set("tiempo",e.target.value)} /></FRow>
        <FRow label="Notas"><input style={S.input} placeholder="Observaciones tecnicas..." value={form.notas} onChange={e=>set("notas",e.target.value)} /></FRow>
        <button style={S.btnPrimary} onClick={guardar}>Agregar al catalogo</button>
      </div>
    </div>
  );
}

// ── Calculadora ───────────────────────────────────────────────────────────────
function Calculadora() {
  const [tec,setTec] = useState(0);
  const [vals,setVals] = useState({lana:490,tinte:80,mord:30,gas:120,lote:10,horas:3,hora:200,over:50,margen:50});
  const set = (k,v) => setVals(p => ({...p,[k]:Number(v)}));
  const presets = [{tinte:80,mord:30,horas:3,over:50},{tinte:150,mord:60,horas:4.5,over:50},{tinte:100,mord:35,horas:4,over:50}];
  const TECS = ["Tinte acido","Tinte natural","Semis"];
  const selTec = i => { setTec(i); setVals(p => ({...p,...presets[i]})); };
  const cLana=vals.lana, cTinte=vals.tinte+vals.mord, cGas=vals.gas/Math.max(1,vals.lote);
  const cMO=(vals.horas*vals.hora)/Math.max(1,vals.lote), cOver=vals.over;
  const total=cLana+cTinte+cGas+cMO+cOver, pvp=total/(1-vals.margen/100), ganancia=pvp-total;
  const margenReal = pvp>0?((ganancia/pvp)*100).toFixed(1):"0.0";
  const fmt = n => `$${Math.round(n).toLocaleString("es-UY")}`;
  const barSegs = [
    {w:cLana/pvp*100,color:"#9C6A40",label:"Lana"},{w:cTinte/pvp*100,color:"#3D5C5A",label:"Quimica"},
    {w:cGas/pvp*100,color:"#B85C42",label:"Energia"},{w:cMO/pvp*100,color:"#6A7FA0",label:"Mano de obra"},
    {w:cOver/pvp*100,color:"#A8BDCC",label:"Overhead"},{w:ganancia/pvp*100,color:"#1D9E75",label:"Margen"},
  ];
  const Sld = ({label,id,min,max,step,unit}) => (
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
      <label style={{fontSize:13,color:"#888780",minWidth:180}}>{label}</label>
      <input type="range" min={min} max={max} step={step} value={vals[id]} style={{flex:1}} onChange={e=>set(id,e.target.value)} />
      <input type="number" min={min} max={max} step={step} value={vals[id]} style={{...S.input,width:72}} onChange={e=>set(id,e.target.value)} />
      <span style={{fontSize:12,color:"#888780",minWidth:32}}>{unit}</span>
    </div>
  );
  return (
    <div>
      <p style={S.label}>Tecnica de tenido</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:"1.25rem"}}>
        {TECS.map((t,i) => (
          <div key={t} onClick={()=>selTec(i)} style={{padding:"8px 6px",borderRadius:8,border:`0.5px solid ${tec===i?"#1D9E75":"rgba(0,0,0,0.15)"}`,background:tec===i?"#E1F5EE":"transparent",cursor:"pointer",fontSize:12,fontWeight:500,color:tec===i?"#085041":"#888780",textAlign:"center"}}>{t}</div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:"1.25rem"}}>
        {[{label:"Costo/madeja",val:fmt(total)},{label:"Precio sugerido",val:fmt(pvp)},{label:"Margen bruto",val:`${margenReal}%`,color:parseFloat(margenReal)>=45?"#085041":parseFloat(margenReal)>=30?"#633806":"#791F1F"},{label:"Ganancia/madeja",val:fmt(ganancia),color:ganancia>0?"#085041":"#791F1F"}].map(m => (
          <div key={m.label} style={S.metric}><p style={{fontSize:11,color:"#888780",margin:"0 0 4px"}}>{m.label}</p><p style={{fontSize:18,fontWeight:500,margin:0,color:m.color||"#2C2C2A"}}>{m.val}</p></div>
        ))}
      </div>
      <div style={S.card}>
        <p style={S.label}>Insumos directos</p>
        <Sld label="Precio lana cruda (madeja)" id="lana"  min={200} max={2000} step={50}  unit="$UY" />
        <Sld label="Tinte (costo por madeja)"   id="tinte" min={30}  max={400}  step={10}  unit="$UY" />
        <Sld label="Mordiente (por madeja)"     id="mord"  min={10}  max={150}  step={5}   unit="$UY" />
        <Sld label="Gas / energia por lote"     id="gas"   min={50}  max={500}  step={25}  unit="$UY" />
        <Sld label="Madejas por lote"           id="lote"  min={1}   max={30}   step={1}   unit="uds" />
      </div>
      <div style={S.card}>
        <p style={S.label}>Mano de obra y overhead</p>
        <Sld label="Horas de trabajo por lote"  id="horas" min={1}   max={8}    step={0.5} unit="h"   />
        <Sld label="Valor hora artesana"        id="hora"  min={100} max={600}  step={25}  unit="$UY" />
        <Sld label="Overhead (etiqueta, bolsa)" id="over"  min={0}   max={200}  step={10}  unit="$UY" />
      </div>
      <div style={S.card}>
        <p style={S.label}>Precio de venta</p>
        <Sld label="Margen objetivo" id="margen" min={20} max={80} step={5} unit="%" />
        <div style={{borderTop:"0.5px solid rgba(0,0,0,0.1)",paddingTop:"0.75rem",marginTop:"0.5rem"}}>
          {[["Lana cruda",fmt(cLana)],["Tinte + mordiente",fmt(cTinte)],["Gas / energia",fmt(cGas)],["Mano de obra",fmt(cMO)],["Overhead",fmt(cOver)]].map(([k,v]) => (
            <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:13,padding:"4px 0",color:"#888780"}}><span>{k}</span><span style={{fontWeight:500,color:"#2C2C2A"}}>{v}</span></div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",fontSize:14,fontWeight:500,borderTop:"0.5px solid rgba(0,0,0,0.1)",marginTop:4,paddingTop:6}}><span>Costo total/madeja</span><span>{fmt(total)}</span></div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:15,fontWeight:500,marginTop:4}}><span>Precio venta sugerido</span><span style={{color:"#085041"}}>{fmt(pvp)}</span></div>
        </div>
        <div style={{display:"flex",height:8,borderRadius:4,overflow:"hidden",marginTop:"1rem"}}>
          {barSegs.map(s => <div key={s.label} style={{width:`${Math.max(0,s.w).toFixed(1)}%`,background:s.color,height:"100%"}} />)}
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:10,marginTop:6}}>
          {barSegs.map(s => <div key={s.label} style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:"#888780"}}><div style={{width:8,height:8,borderRadius:"50%",background:s.color}} />{s.label}</div>)}
        </div>
      </div>
    </div>
  );
}

// ── Identificador ─────────────────────────────────────────────────────────────
function IdentificadorColor({ onAgregarColor }) {
  const [imgSrc,setImgSrc]=useState(null);
  const [palette,setPalette]=useState([]);
  const [selectedHex,setSelectedHex]=useState(null);
  const [loading,setLoading]=useState(false);
  const [result,setResult]=useState(null);
  const [addName,setAddName]=useState("");
  const [addFamilia,setAddFamilia]=useState("tierra");
  const [addTipo,setAddTipo]=useState("exc");
  const [drag,setDrag]=useState(false);
  const canvasRef=useRef(null), fileRef=useRef(null);

  const processFile = file => {
    if (!file||!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = ev => { setImgSrc(ev.target.result); setSelectedHex(null); setResult(null); };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!imgSrc) return;
    const img = new Image();
    img.onload = () => {
      const canvas=canvasRef.current, ctx=canvas.getContext("2d");
      canvas.width=img.naturalWidth; canvas.height=img.naturalHeight;
      ctx.drawImage(img,0,0);
      const data=ctx.getImageData(0,0,canvas.width,canvas.height).data;
      const buckets={};
      const step=Math.max(1,Math.floor(data.length/(4*2000)));
      for (let i=0;i<data.length;i+=4*step) {
        if (data[i+3]<128) continue;
        const r=Math.round(data[i]/32)*32, g=Math.round(data[i+1]/32)*32, b=Math.round(data[i+2]/32)*32;
        const key=`${r},${g},${b}`; buckets[key]=(buckets[key]||0)+1;
      }
      const sorted=Object.entries(buckets).sort((a,b)=>b[1]-a[1]);
      const colors=[];
      for (const [key] of sorted) {
        const [r,g,b]=key.split(",").map(Number);
        const dist=c=>Math.sqrt((c[0]-r)**2+(c[1]-g)**2+(c[2]-b)**2);
        if (!colors.some(c=>dist(c)<60)) { colors.push([r,g,b]); if(colors.length>=8) break; }
      }
      setPalette(colors.map(([r,g,b])=>"#"+[r,g,b].map(v=>v.toString(16).padStart(2,"0")).join("")));
    };
    img.src=imgSrc;
  },[imgSrc]);

  const analyze = useCallback(async () => {
    if (!selectedHex) return;
    setLoading(true); setResult(null);
    const r=parseInt(selectedHex.slice(1,3),16), g=parseInt(selectedHex.slice(3,5),16), b=parseInt(selectedHex.slice(5,7),16);
    const prompt=`Sos un experto en tenido artesanal de lana merino para Junco Verde (Uruguay). Color RGB: R=${r},G=${g},B=${b} (hex:${selectedHex}). Responde SOLO JSON valido sin markdown: {"nombre_sugerido":"nombre 2-3 palabras estilo uruguayo","descripcion":"oracion breve","tecnica":"Tinte acido|Tinte natural|Semis","tinte_principal":"nombre","tinte_secundario":"o vacio","mordiente":"nombre","proporcion_tinte":"X% OPF","temperatura":"XX C","tiempo":"XX min","dificultad":"Baja|Media|Alta|Muy alta","pasos_clave":"2-3 oraciones","familia_sugerida":"tierra|frios|calidos|neutros"}`;
    try {
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompt}]})});
      const data=await res.json();
      const text=data.content.filter(b=>b.type==="text").map(b=>b.text).join("");
      const parsed=JSON.parse(text.replace(/```json|```/g,"").trim());
      parsed._hex=selectedHex; setResult(parsed); setAddName(parsed.nombre_sugerido); setAddFamilia(parsed.familia_sugerida||"tierra");
    } catch { alert("Error al analizar. Verifica la API key."); }
    finally { setLoading(false); }
  },[selectedHex]);

  const agregar = () => {
    if (!result) return;
    onAgregarColor({id:`c${Date.now()}`,nombre:addName||result.nombre_sugerido,hex:result._hex,familia:addFamilia,tecnica:result.tecnica,tipo:addTipo,stock:0});
    setImgSrc(null); setPalette([]); setSelectedHex(null); setResult(null);
  };

  return (
    <div>
      <canvas ref={canvasRef} style={{display:"none"}} />
      <div onClick={()=>fileRef.current.click()} onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);processFile(e.dataTransfer.files[0]);}}
        style={{border:`1.5px dashed ${drag?"#1D9E75":"rgba(0,0,0,0.2)"}`,borderRadius:12,padding:"2rem",textAlign:"center",cursor:"pointer",marginBottom:"1rem",background:drag?"#E1F5EE":"transparent"}}>
        <p style={{fontSize:14,color:"#888780",margin:"0 0 4px"}}>Subi una foto de la prenda, hilo o material</p>
        <p style={{fontSize:12,color:"#B4B2A9",margin:0}}>JPG, PNG, WEBP — o arrasta la imagen aca</p>
        <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>processFile(e.target.files[0])} />
      </div>
      {imgSrc && (
        <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:"1rem"}}>
          <img src={imgSrc} alt="Cargada" style={{width:120,height:120,objectFit:"cover",borderRadius:8,border:"0.5px solid rgba(0,0,0,0.1)",flexShrink:0}} />
          <div style={{flex:1}}>
            <p style={{fontSize:12,color:"#888780",margin:"0 0 8px"}}>Paleta extraida — elegi el color a analizar:</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {palette.map(hex => <div key={hex} onClick={()=>setSelectedHex(hex)} style={{width:32,height:32,borderRadius:6,background:hex,border:selectedHex===hex?"2px solid #1D9E75":"0.5px solid rgba(0,0,0,0.1)",cursor:"pointer",outline:selectedHex===hex?"2px solid #1D9E75":"none",outlineOffset:2}} />)}
            </div>
            {selectedHex && <p style={{fontSize:12,color:"#888780",margin:"8px 0 0"}}>Seleccionado: {selectedHex}</p>}
          </div>
        </div>
      )}
      {imgSrc && <button style={{...S.btnPrimary,opacity:!selectedHex?0.5:1}} disabled={!selectedHex||loading} onClick={analyze}>{loading?"Analizando con IA...":"Analizar color con IA"}</button>}
      {loading && <div style={{height:3,borderRadius:2,background:"#F1EFE8",overflow:"hidden",margin:"8px 0"}}><div style={{height:"100%",background:"#1D9E75",borderRadius:2,animation:"jv-load 1.4s ease-in-out infinite",width:"60%"}} /></div>}
      {result && (
        <div style={S.card}>
          <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:"1rem"}}>
            <div style={{width:56,height:56,borderRadius:8,background:result._hex,border:"0.5px solid rgba(0,0,0,0.1)",flexShrink:0}} />
            <div>
              <p style={{fontSize:16,fontWeight:500,margin:"0 0 3px"}}>{result.nombre_sugerido}</p>
              <p style={{fontSize:12,color:"#888780",margin:"0 0 4px",fontFamily:"monospace"}}>{result._hex?.toUpperCase()}</p>
              <p style={{fontSize:12,color:"#5F5E5A",margin:0}}>{result.descripcion}</p>
              <span style={{...bdg(result.tecnica==="Tinte natural"?"natural":"acido"),marginTop:4}}>{result.tecnica} · Dificultad {result.dificultad}</span>
            </div>
          </div>
          <p style={S.label}>Formula sugerida</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:"0.75rem"}}>
            {[["Tinte principal",result.tinte_principal],["Tinte secundario",result.tinte_secundario||"—"],["Mordiente",result.mordiente],["Proporcion tinte",result.proporcion_tinte],["Temperatura",result.temperatura],["Tiempo en bano",result.tiempo]].map(([k,v]) => (
              <div key={k} style={{background:"#F1EFE8",borderRadius:8,padding:"8px 10px"}}><p style={{fontSize:11,color:"#888780",margin:"0 0 2px"}}>{k}</p><p style={{fontSize:13,color:"#2C2C2A",margin:0}}>{v}</p></div>
            ))}
          </div>
          <p style={S.label}>Proceso recomendado</p>
          <p style={{fontSize:13,color:"#5F5E5A",lineHeight:1.6,marginBottom:"0.75rem"}}>{result.pasos_clave}</p>
          <div style={{borderTop:"0.5px solid rgba(0,0,0,0.1)",paddingTop:"0.75rem"}}>
            <p style={S.label}>Agregar al catalogo</p>
            <div style={{display:"flex",gap:8,marginBottom:6}}>
              <input style={{...S.input,flex:2}} placeholder="Nombre del color" value={addName} onChange={e=>setAddName(e.target.value)} />
              <select style={{...S.select,flex:1}} value={addFamilia} onChange={e=>setAddFamilia(e.target.value)}>
                <option value="tierra">Tierra</option><option value="frios">Frios</option><option value="calidos">Calidos</option><option value="neutros">Neutros</option>
              </select>
              <select style={{...S.select,flex:1}} value={addTipo} onChange={e=>setAddTipo(e.target.value)}>
                <option value="base">Base</option><option value="exc">Exclusivo</option><option value="neu">Neutro</option>
              </select>
            </div>
            <button style={{...S.btnPrimary,marginTop:0}} onClick={agregar}>Agregar al catalogo</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Proceso ───────────────────────────────────────────────────────────────────
function Proceso({ colores }) {
  const [pasoActivo,setPasoActivo] = useState(0);
  const [tecnicaAbierta,setTecnicaAbierta] = useState(null);
  const paso = PASOS[pasoActivo];
  return (
    <div>
      <p style={S.label}>Protocolo universal de tenido — 7 pasos</p>
      <div style={S.card}>
        <div style={{display:"flex",gap:0,marginBottom:"1.25rem",overflowX:"auto"}}>
          {PASOS.map((p,i) => (
            <div key={i} onClick={()=>setPasoActivo(i)} style={{flex:1,minWidth:60,textAlign:"center",cursor:"pointer",paddingBottom:8,borderBottom:`2px solid ${pasoActivo===i?"#1D9E75":"rgba(0,0,0,0.08)"}`}}>
              <div style={{width:28,height:28,borderRadius:"50%",margin:"0 auto 4px",background:i<pasoActivo?"#1D9E75":i===pasoActivo?"#E1F5EE":"#F1EFE8",border:`1.5px solid ${i<=pasoActivo?"#1D9E75":"rgba(0,0,0,0.12)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:600,color:i<pasoActivo?"#fff":i===pasoActivo?"#085041":"#888780"}}>
                {i<pasoActivo?"✓":i+1}
              </div>
              <p style={{fontSize:9,color:pasoActivo===i?"#085041":"#888780",margin:0,lineHeight:1.3}}>{p.titulo}</p>
            </div>
          ))}
        </div>
        <div style={{background:"#F8F7F3",borderRadius:10,padding:"1rem 1.25rem",marginBottom:"0.75rem"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
            <div>
              <span style={{fontSize:10,color:"#1D9E75",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em"}}>Paso {pasoActivo+1} de {PASOS.length}</span>
              <p style={{fontSize:15,fontWeight:500,margin:"2px 0 0",color:"#2C2C2A"}}>{paso.titulo}</p>
            </div>
            <span style={{...bdg("lote"),fontSize:11}}>{paso.tiempo}</span>
          </div>
          <p style={{fontSize:13,color:"#5F5E5A",lineHeight:1.7,margin:0}}>{paso.desc}</p>
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"space-between"}}>
          <button style={{...S.btn,opacity:pasoActivo===0?0.4:1}} disabled={pasoActivo===0} onClick={()=>setPasoActivo(p=>p-1)}>← Anterior</button>
          <button style={{...S.btn,opacity:pasoActivo===PASOS.length-1?0.4:1}} disabled={pasoActivo===PASOS.length-1} onClick={()=>setPasoActivo(p=>p+1)}>Siguiente →</button>
        </div>
      </div>
      <p style={{...S.label,marginTop:"1.5rem"}}>Tecnicas disponibles</p>
      {TECNICAS.map(t => {
        const abierta = tecnicaAbierta===t.id;
        const coloresTec = colores.filter(c => t.coloresPaleta.includes(c.id));
        return (
          <div key={t.id} style={{...S.card,cursor:"pointer",boxShadow:abierta?"0 2px 12px rgba(0,0,0,0.08)":"none"}} onClick={()=>setTecnicaAbierta(abierta?null:t.id)}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:36,height:36,borderRadius:8,background:t.bgAcento,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{t.icono}</div>
                <div>
                  <p style={{fontWeight:500,fontSize:14,margin:"0 0 2px"}}>{t.nombre}</p>
                  <span style={bdg(t.badge)}>{coloresTec.length} color{coloresTec.length!==1?"es":""} en catalogo</span>
                </div>
              </div>
              <span style={{fontSize:18,color:"#888780",display:"inline-block",transform:abierta?"rotate(90deg)":"none",transition:"transform 0.2s"}}>›</span>
            </div>
            {abierta && (
              <div style={{marginTop:"1rem",borderTop:"0.5px solid rgba(0,0,0,0.08)",paddingTop:"1rem"}}>
                <p style={{fontSize:13,color:"#5F5E5A",lineHeight:1.6,marginBottom:"1rem"}}>{t.descripcion}</p>
                {coloresTec.length>0 && (
                  <>
                    <p style={S.label}>Colores en catalogo</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:"1rem"}}>
                      {coloresTec.map(c => (
                        <div key={c.id} style={{display:"flex",alignItems:"center",gap:6,background:"#F8F7F3",borderRadius:6,padding:"4px 8px"}}>
                          <div style={{width:10,height:10,borderRadius:"50%",background:c.hex,border:"0.5px solid rgba(0,0,0,0.1)",flexShrink:0}} />
                          <span style={{fontSize:12,color:"#5F5E5A"}}>{c.nombre}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                <p style={S.label}>Parametros</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:"1rem"}}>
                  {t.parametros.map(([k,v]) => (
                    <div key={k} style={{background:"#F8F7F3",borderRadius:8,padding:"8px 10px"}}>
                      <p style={{fontSize:10,color:"#888780",margin:"0 0 2px"}}>{k}</p>
                      <p style={{fontSize:12,color:"#2C2C2A",margin:0,fontWeight:500}}>{v}</p>
                    </div>
                  ))}
                </div>
                <div style={{background:t.bgAcento,borderRadius:8,padding:"10px 12px",display:"flex",gap:10,alignItems:"flex-start"}}>
                  <span style={{fontSize:16,flexShrink:0}}>{t.consejoTipo==="proveedor"?"🛒":t.consejoTipo==="insumo"?"🌿":"💡"}</span>
                  <p style={{fontSize:12,color:t.colorAcento,margin:0,lineHeight:1.6}}>{t.consejo}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Pantone TCX ───────────────────────────────────────────────────────────────
function PantoneTCX({ onAgregarColor }) {
  const [q,setQ] = useState("");
  const [familia,setFamilia] = useState("todos");
  const [selColor,setSelColor] = useState(null);
  const [loadingFormula,setLoadingFormula] = useState(false);
  const [formula,setFormula] = useState(null);
  const [addNombre,setAddNombre] = useState("");
  const [addTipo,setAddTipo] = useState("base");

  const filtrados = PANTONE_TCX.filter(p => {
    const matchQ = !q || p.codigo.toLowerCase().includes(q.toLowerCase()) || p.nombre.toLowerCase().includes(q.toLowerCase());
    const matchF = familia==="todos" || p.familia===familia;
    return matchQ && matchF;
  });

  const seleccionar = color => { setSelColor(color); setFormula(null); setAddNombre(color.nombre); };

  const calcularFormula = async () => {
    if (!selColor) return;
    setLoadingFormula(true); setFormula(null);
    const r=parseInt(selColor.hex.slice(1,3),16), g=parseInt(selColor.hex.slice(3,5),16), b=parseInt(selColor.hex.slice(5,7),16);
    const prompt=`Sos un experto en tenido artesanal de lana merino para Junco Verde (Uruguay). El cliente quiere lograr el color Pantone ${selColor.codigo} "${selColor.nombre}" en lana merino. RGB: R=${r},G=${g},B=${b} (hex:${selColor.hex}). Usamos tintes acidos Lanaset o tintes naturales, mordiente alumbre o sulfato de amonio, pH 4-5.5, temperatura 75-90C. Responde SOLO JSON valido sin markdown: {"tecnica":"Tinte acido|Tinte natural|Semis","tinte_principal":"nombre","tinte_secundario":"o vacio","proporcion_principal":"X% OPF","proporcion_secundario":"X% OPF o vacio","mordiente":"nombre","proporcion_mordiente":"X% OPF","ph":"rango","temperatura":"XX C","tiempo":"XX min","dificultad":"Baja|Media|Alta|Muy alta","nota_merino":"como la fibra modifica el resultado","pasos_clave":"3-4 oraciones","implementos":["item1","item2"],"variacion_esperada":"descripcion breve"}`;
    try {
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1200,messages:[{role:"user",content:prompt}]})});
      const data=await res.json();
      const text=data.content.filter(b=>b.type==="text").map(b=>b.text).join("");
      const parsed=JSON.parse(text.replace(/```json|```/g,"").trim());
      setFormula(parsed);
    } catch { alert("Error al calcular la formula. Verifica la API key."); }
    finally { setLoadingFormula(false); }
  };

  const agregar = () => {
    if (!selColor||!formula) return;
    const familiaMap = {verdes:"tierra",violetas:"frios",rosas:"calidos"};
    onAgregarColor({id:`c${Date.now()}`,nombre:addNombre||selColor.nombre,hex:selColor.hex,familia:familiaMap[selColor.familia]||selColor.familia,tecnica:formula.tecnica,tipo:addTipo,stock:0,tintePrincipal:formula.tinte_principal,mordiente:formula.mordiente,_pantone:selColor.codigo});
    setSelColor(null); setFormula(null); setQ("");
  };

  return (
    <div>
      <div style={{background:"#F8F7F3",borderRadius:10,padding:"10px 14px",marginBottom:"1.25rem",display:"flex",gap:10,alignItems:"flex-start"}}>
        <span style={{fontSize:16,flexShrink:0}}>🎨</span>
        <div>
          <p style={{fontSize:13,fontWeight:500,color:"#2C2C2A",margin:"0 0 2px"}}>Pantone Fashion and Home TCX</p>
          <p style={{fontSize:12,color:"#888780",margin:0,lineHeight:1.5}}>Busca cualquier color Pantone TCX y la IA calculara la formula de tenido para lograrlo en tu lana merino.</p>
        </div>
      </div>
      <input style={{...S.input,marginBottom:"0.75rem"}} placeholder="Buscar por codigo (ej: 18-1550 TCX) o nombre (ej: Caramel)..." value={q} onChange={e=>{setQ(e.target.value);setSelColor(null);setFormula(null);}} />
      <div style={{display:"flex",gap:5,marginBottom:"1rem",flexWrap:"wrap"}}>
        {FAMILIAS_PANTONE.map(f => (
          <div key={f.id} onClick={()=>{setFamilia(f.id);setSelColor(null);setFormula(null);}} style={{padding:"4px 10px",borderRadius:6,border:`0.5px solid ${familia===f.id?"#1D9E75":"rgba(0,0,0,0.15)"}`,background:familia===f.id?"#E1F5EE":"transparent",cursor:"pointer",fontSize:11,fontWeight:500,color:familia===f.id?"#085041":"#888780"}}>{f.label}</div>
        ))}
      </div>
      <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
        <div style={{flex:1}}>
          <p style={{...S.label,margin:"0 0 8px"}}>{filtrados.length} colores</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(72px,1fr))",gap:6,maxHeight:420,overflowY:"auto",paddingRight:4}}>
            {filtrados.map(p => (
              <div key={p.codigo} onClick={()=>seleccionar(p)} style={{borderRadius:8,overflow:"hidden",border:`1.5px solid ${selColor?.codigo===p.codigo?"#1D9E75":"rgba(0,0,0,0.1)"}`,cursor:"pointer",boxShadow:selColor?.codigo===p.codigo?"0 0 0 2px #1D9E75":"none"}}>
                <div style={{height:48,background:p.hex}} />
                <div style={{padding:"4px 5px",background:"#fff"}}>
                  <p style={{fontSize:9,fontWeight:600,margin:"0 0 1px",color:"#2C2C2A",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.nombre}</p>
                  <p style={{fontSize:8,margin:0,color:"#888780"}}>{p.codigo.replace(" TCX","")}</p>
                </div>
              </div>
            ))}
          </div>
          {filtrados.length===0 && <p style={{textAlign:"center",color:"#888780",fontSize:13,padding:"2rem"}}>No se encontraron colores.</p>}
        </div>
        {selColor && (
          <div style={{width:260,flexShrink:0}}>
            <div style={{...S.card,padding:0,overflow:"hidden",marginBottom:"0.75rem"}}>
              <div style={{height:80,background:selColor.hex,display:"flex",alignItems:"flex-end",padding:"8px 12px"}}>
                <div>
                  <p style={{fontSize:15,fontWeight:500,margin:"0 0 2px",color:isDark(selColor.hex)?"#F0ECE6":"#2C2C2A"}}>{selColor.nombre}</p>
                  <p style={{fontSize:11,margin:0,color:isDark(selColor.hex)?"rgba(240,236,230,0.8)":"rgba(44,44,42,0.7)",fontFamily:"monospace"}}>{selColor.codigo}</p>
                </div>
              </div>
              <div style={{padding:"8px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:11,color:"#888780",fontFamily:"monospace"}}>{selColor.hex.toUpperCase()}</span>
                <span style={bdg("lote")}>{FAMILIAS_PANTONE.find(f=>f.id===selColor.familia)?.label||selColor.familia}</span>
              </div>
            </div>
            <button style={{...S.btnPrimary,marginTop:0,marginBottom:"0.75rem",opacity:loadingFormula?0.7:1}} disabled={loadingFormula} onClick={calcularFormula}>
              {loadingFormula
                ? <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><span style={{display:"inline-block",animation:"jv-spin 1s linear infinite"}}>⟳</span> Calculando...</span>
                : "Calcular formula con IA"}
            </button>
            {loadingFormula && <div style={{height:3,borderRadius:2,background:"#F1EFE8",overflow:"hidden",marginBottom:"0.75rem"}}><div style={{height:"100%",background:"#1D9E75",borderRadius:2,animation:"jv-load 1.4s ease-in-out infinite",width:"60%"}} /></div>}
            {formula && (
              <div style={S.card}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.75rem"}}>
                  <span style={bdg(formula.tecnica==="Tinte natural"?"natural":"acido")}>{formula.tecnica}</span>
                  <span style={{fontSize:11,color:"#888780"}}>Dificultad: {formula.dificultad}</span>
                </div>
                <p style={S.label}>Formula</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5,marginBottom:"0.75rem"}}>
                  {[["Tinte principal",formula.tinte_principal],["Tinte secundario",formula.tinte_secundario||"—"],["% principal",formula.proporcion_principal],["% secundario",formula.proporcion_secundario||"—"],["Mordiente",formula.mordiente],["% mordiente",formula.proporcion_mordiente],["pH",formula.ph],["Temperatura",formula.temperatura],["Tiempo",formula.tiempo]].map(([k,v]) => (
                    <div key={k} style={{background:"#F8F7F3",borderRadius:6,padding:"6px 8px"}}><p style={{fontSize:9,color:"#888780",margin:"0 0 1px",textTransform:"uppercase",letterSpacing:"0.04em"}}>{k}</p><p style={{fontSize:11,color:"#2C2C2A",margin:0,fontWeight:500}}>{v}</p></div>
                  ))}
                </div>
                {formula.implementos&&formula.implementos.length>0&&(
                  <div style={{marginBottom:"0.75rem"}}>
                    <p style={S.label}>Implementos</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                      {formula.implementos.map(imp => <span key={imp} style={{fontSize:10,background:"#F1EFE8",color:"#444441",padding:"2px 7px",borderRadius:4,border:"0.5px solid rgba(0,0,0,0.1)"}}>{imp}</span>)}
                    </div>
                  </div>
                )}
                <p style={S.label}>Proceso</p>
                <p style={{fontSize:11,color:"#5F5E5A",lineHeight:1.6,margin:"0 0 0.75rem"}}>{formula.pasos_clave}</p>
                <div style={{background:"#FAEEDA",borderRadius:8,padding:"8px 10px",marginBottom:"0.5rem"}}>
                  <p style={{fontSize:10,fontWeight:600,color:"#633806",margin:"0 0 3px",textTransform:"uppercase",letterSpacing:"0.04em"}}>Variacion en fibra natural</p>
                  <p style={{fontSize:11,color:"#633806",margin:0,lineHeight:1.5}}>{formula.variacion_esperada}</p>
                </div>
                {formula.nota_merino&&(
                  <div style={{background:"#E1F5EE",borderRadius:8,padding:"8px 10px",marginBottom:"0.75rem"}}>
                    <p style={{fontSize:10,fontWeight:600,color:"#085041",margin:"0 0 3px",textTransform:"uppercase",letterSpacing:"0.04em"}}>Nota para merino</p>
                    <p style={{fontSize:11,color:"#085041",margin:0,lineHeight:1.5}}>{formula.nota_merino}</p>
                  </div>
                )}
                <div style={{borderTop:"0.5px solid rgba(0,0,0,0.08)",paddingTop:"0.75rem"}}>
                  <p style={S.label}>Agregar al catalogo</p>
                  <input style={{...S.input,marginBottom:6}} placeholder="Nombre para el catalogo" value={addNombre} onChange={e=>setAddNombre(e.target.value)} />
                  <select style={{...S.select,marginBottom:6}} value={addTipo} onChange={e=>setAddTipo(e.target.value)}>
                    <option value="base">Base de temporada</option>
                    <option value="exc">Color exclusivo</option>
                    <option value="neu">Neutro permanente</option>
                  </select>
                  <button style={{...S.btnPrimary,marginTop:0}} onClick={agregar}>Agregar al catalogo</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Proveedores ───────────────────────────────────────────────────────────────
function Proveedores() {
  const [cat,setCat] = useState("todos");
  const [lista,setLista] = useState(PROVEEDORES);
  const [buscando,setBuscando] = useState(false);
  const [ultimaActualizacion,setUltimaActualizacion] = useState(null);
  const [nuevosIds,setNuevosIds] = useState([]);
  const CATS = [{id:"todos",label:"Todos"},{id:"tinte",label:"Tintes Lanaset"},{id:"quimica",label:"Quimica local"},{id:"natural",label:"Tintes naturales"}];
  const filtrados = cat==="todos" ? lista : lista.filter(p=>p.cat===cat);
  const urgColor = u => {
    if (u==="Ruta recomendada"||u==="Principal local") return {background:"#E1F5EE",color:"#085041"};
    if (u==="Casi sin costo"||u==="Delivery gratis")  return {background:"#FAEEDA",color:"#633806"};
    return {background:"#F1EFE8",color:"#444441"};
  };
  const buscarProveedores = async () => {
    setBuscando(true); setNuevosIds([]);
    const prompt=`Sos un asistente de abastecimiento para Junco Verde, marca artesanal de lana merino en Uruguay. Busca proveedores actualizados para: 1) "tinte" tintes acidos Lanaset que envien a Uruguay; 2) "quimica" mordientes alumbre sulfato de amonio Uruguay o Argentina; 3) "natural" materiales vegetales para tinte natural en Uruguay. Devuelve SOLO array JSON valido sin markdown. Cada objeto: {"cat":"tinte|quimica|natural","nombre":"...","pais":"...","web":"URL o —","tag":"etiqueta corta","urgencia":"texto corto","descripcion":"2-3 oraciones utiles"}. Entre 3 y 5 proveedores nuevos, no repetir los ya conocidos.`;
    try {
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1500,tools:[{"type":"web_search_20250305","name":"web_search"}],messages:[{role:"user",content:prompt}]})});
      const data=await res.json();
      const text=data.content.filter(b=>b.type==="text").map(b=>b.text).join("");
      const clean=text.replace(/```json|```/g,"").trim();
      const nuevos=JSON.parse(clean);
      const ids=nuevos.map((_,i)=>`nuevo-${Date.now()}-${i}`);
      const nuevosConId=nuevos.map((p,i)=>({...p,_id:ids[i],_nuevo:true}));
      setLista(prev=>[...prev,...nuevosConId]);
      setNuevosIds(ids);
      setUltimaActualizacion(new Date().toLocaleDateString("es-UY",{day:"2-digit",month:"2-digit",year:"numeric"}));
    } catch { alert("No se pudo obtener proveedores. Verifica la conexion o la API key."); }
    finally { setBuscando(false); }
  };
  return (
    <div>
      <div style={{background:"#E6F1FB",borderRadius:10,padding:"10px 14px",marginBottom:"1.25rem",display:"flex",gap:10,alignItems:"flex-start"}}>
        <span style={{fontSize:16,flexShrink:0}}>📦</span>
        <div>
          <p style={{fontSize:13,fontWeight:500,color:"#0C447C",margin:"0 0 2px"}}>Estrategia de abastecimiento</p>
          <p style={{fontSize:12,color:"#2C5B8A",margin:0,lineHeight:1.6}}>Tintes Lanaset: importar desde EEUU (Dharma / PRO Chemical). Quimica: DIU o AFranco en Montevideo. Tintes naturales: Mercado Agricola y herboristeria.</p>
        </div>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem",flexWrap:"wrap",gap:8}}>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {CATS.map(c => <div key={c.id} onClick={()=>setCat(c.id)} style={{padding:"5px 12px",borderRadius:6,border:`0.5px solid ${cat===c.id?"#1D9E75":"rgba(0,0,0,0.15)"}`,background:cat===c.id?"#E1F5EE":"transparent",cursor:"pointer",fontSize:12,fontWeight:500,color:cat===c.id?"#085041":"#888780"}}>{c.label}</div>)}
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:3}}>
          <button onClick={buscarProveedores} disabled={buscando} style={{...S.btn,background:"#E1F5EE",border:"0.5px solid #1D9E75",color:"#085041",opacity:buscando?0.7:1,display:"flex",alignItems:"center",gap:6,whiteSpace:"nowrap"}}>
            {buscando ? <><span style={{display:"inline-block",animation:"jv-spin 1s linear infinite"}}>⟳</span> Buscando...</> : <>🔍 Buscar nuevos proveedores</>}
          </button>
          {ultimaActualizacion && <span style={{fontSize:10,color:"#888780"}}>Ultima busqueda: {ultimaActualizacion}</span>}
        </div>
      </div>
      {nuevosIds.length>0&&(
        <div style={{background:"#E1F5EE",borderRadius:8,padding:"8px 12px",marginBottom:"1rem",fontSize:12,color:"#085041",display:"flex",alignItems:"center",gap:8}}>
          <span>✓</span><span>Se agregaron {nuevosIds.length} proveedores nuevos.</span>
        </div>
      )}
      {filtrados.map((p,i) => {
        const uc = urgColor(p.urgencia);
        return (
          <div key={p._id||i} style={{...S.card,border:p._nuevo?"0.5px solid #1D9E75":"0.5px solid rgba(0,0,0,0.12)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                  <p style={{fontWeight:500,fontSize:13,margin:0}}>{p.nombre}</p>
                  {p._nuevo&&<span style={{fontSize:9,background:"#1D9E75",color:"#fff",padding:"1px 6px",borderRadius:3,fontWeight:600}}>NUEVO</span>}
                </div>
                <p style={{fontSize:11,color:"#888780",margin:0}}>{p.pais}{p.web&&p.web!=="—"&&<span> · <span style={{color:"#1D9E75"}}>{p.web}</span></span>}</p>
              </div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,flexShrink:0,marginLeft:8}}>
                <span style={bdg("lote")}>{p.tag}</span>
                <span style={{...uc,fontSize:10,padding:"2px 8px",borderRadius:3,fontWeight:500,display:"inline-block"}}>{p.urgencia}</span>
              </div>
            </div>
            <p style={{fontSize:12,color:"#5F5E5A",margin:0,lineHeight:1.6}}>{p.descripcion}</p>
          </div>
        );
      })}
    </div>
  );
}

// ── Alertas ───────────────────────────────────────────────────────────────────
function Alertas({ colores }) {
  const alertas = [];
  colores.forEach(c => {
    if (c.stock===0) alertas.push({tipo:"danger",msg:`${c.nombre}: sin stock — programar lote urgente`});
    else if (c.stock<=3) alertas.push({tipo:"warn",msg:`${c.nombre}: stock bajo (${c.stock} uds) — planificar reposicion`});
  });
  const naturales = colores.filter(c=>c.tecnica==="Tinte natural"&&c.stock<5);
  if (naturales.length) alertas.push({tipo:"info",msg:`${naturales.length} color(es) natural(es) con stock critico`});
  const colors = {danger:{bg:"#FCEBEB",fg:"#791F1F"},warn:{bg:"#FAEEDA",fg:"#633806"},info:{bg:"#E6F1FB",fg:"#0C447C"}};
  return (
    <div>
      <p style={S.label}>Alertas activas</p>
      {alertas.length===0
        ? <EmptyState mensaje="Sin alertas activas. Todo en orden." />
        : alertas.map((a,i) => (
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",borderRadius:8,fontSize:13,marginBottom:6,background:colors[a.tipo].bg,color:colors[a.tipo].fg}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:"currentColor",flexShrink:0}} />{a.msg}
            </div>
          ))
      }
    </div>
  );
}

// ── App principal ─────────────────────────────────────────────────────────────
export default function TenidosApp() {
  const [colores,setColores] = useState(COLORES_INICIALES);
  const [lotes,setLotes]     = useState(LOTES_INICIALES);
  const [tab,setTab]         = useState(0);
  const [subView,setSubView] = useState(null);

  const TABS = [
    {label:"Panel",id:0},{label:"Catalogo",id:1},{label:"Lotes",id:2},{label:"Proceso",id:3},
    {label:"Costos",id:4},{label:"Identificador",id:5},{label:"Pantone TCX",id:6},
    {label:"Proveedores",id:7},{label:"Alertas",id:8},
  ];

  const agregarLote = lote => {
    setLotes(prev => [...prev,lote]);
    setColores(prev => prev.map(c => c.id===lote.colorId ? {...c,stock:c.stock+lote.madejas} : c));
    setSubView(null); setTab(2);
  };

  const agregarColor = color => {
    setColores(prev => [...prev,color]);
    setSubView(null); setTab(1);
  };

  const renderContent = () => {
    if (subView==="nuevoLote")  return <NuevoLote colores={colores} lotes={lotes} onGuardar={agregarLote} />;
    if (subView==="nuevoColor") return <NuevoColor onGuardar={agregarColor} onCancelar={()=>setSubView(null)} />;
    if (tab===0) return <Panel colores={colores} lotes={lotes} onTab={setTab} />;
    if (tab===1) return <Catalogo colores={colores} onNuevoColor={()=>setSubView("nuevoColor")} />;
    if (tab===2) return <Lotes lotes={lotes} colores={colores} onNuevoLote={()=>setSubView("nuevoLote")} />;
    if (tab===3) return <Proceso colores={colores} />;
    if (tab===4) return <Calculadora />;
    if (tab===5) return <IdentificadorColor onAgregarColor={agregarColor} />;
    if (tab===6) return <PantoneTCX onAgregarColor={agregarColor} />;
    if (tab===7) return <Proveedores />;
    if (tab===8) return <Alertas colores={colores} />;
    return null;
  };

  return (
    <div style={{fontFamily:"Georgia,serif",maxWidth:860,margin:"0 auto",padding:"1.5rem 1rem"}}>
      <div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:"1.5rem",borderBottom:"0.5px solid rgba(0,0,0,0.1)",paddingBottom:"1rem"}}>
        <h1 style={{fontSize:22,fontWeight:400,margin:0,letterSpacing:"0.02em"}}>Junco Verde</h1>
        <span style={{fontSize:13,color:"#888780",fontFamily:"sans-serif"}}>Division de tenidos · beta</span>
      </div>
      <div style={{display:"flex",borderBottom:"0.5px solid rgba(0,0,0,0.1)",marginBottom:"1.25rem",gap:0,overflowX:"auto"}}>
        {TABS.map(t => (
          <div key={t.id} onClick={()=>{setTab(t.id);setSubView(null);}}
            style={{padding:"8px 14px",fontSize:12,fontWeight:500,cursor:"pointer",color:tab===t.id?"#1D9E75":"#888780",borderBottom:`2px solid ${tab===t.id?"#1D9E75":"transparent"}`,marginBottom:-1,whiteSpace:"nowrap",fontFamily:"sans-serif"}}>
            {t.label}
          </div>
        ))}
      </div>
      <div style={{fontFamily:"sans-serif"}}>{renderContent()}</div>
      <style>{`
        @keyframes jv-load{0%{margin-left:0;width:30%}50%{margin-left:30%;width:50%}100%{margin-left:100%;width:0%}}
        @keyframes jv-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>
    </div>
  );
}
