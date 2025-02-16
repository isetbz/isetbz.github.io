#let pv(num1, num2, result, content) = {

  set document(author: "Dept de génie électrique", title: "Fiche d'évaluation")
  
  set page(
    margin: (left: 2cm, right: 2cm, top: 3cm, bottom: 3cm),
    numbering: none,
    number-align: center,
    header: [
      #set text(10pt)
      #grid(
      	columns: (2fr, auto),
      	align : (left, center),
      	grid(
      		columns: (auto),
      		gutter: 10pt,
      		"Institut Supérieur des Études Technologiques de Bizerte", "Département de Génie électrique"
      		),
  		image("ISETBZ.png", height: 60%),
      	) 
      	#line(length: 60%)
    ],
    header-ascent: 30%,
    footer: [
      #set text(10pt)
      #align(center)[#line(length: 100%) ISET Bizerte BP. 65 - Campus universitaire 7035 Menzel Abderrahmen \ Tél : 72 57 06 01 Fax : 72 57 24 55 e-Mail : #link("mailto:isetbz@isetbz.rnu.tn")
      ]
    ],
    footer-descent: 20%

  )
  

  // Title row
  align(center)[
    #block(width: 80%, text(weight: "bold", size: 28pt, "Fiche d'évaluation du stage d'initiation"))
  ]

  v(.5cm)

  // Author information
  align(center)[
    #block(text(weight: 400, size: 14pt, "Année Universitaire : 2024-2025"))
  ]

  // Main body
  set par(justify: true)
  
  content
}

#let parse_json(json_string) = {
  // Remove the outer quotes if present
  let cleaned = if json_string.starts-with("\"") and json_string.ends-with("\"") {
    json_string.slice(1, -1)
  } else {
    json_string
  }
  
  // Remove the curly braces
  let content = cleaned.slice(1, -1)
  
  // Split into key-value pairs
  let pairs = content.split(", ")
  
  // Parse each pair into a dictionary
  let result = (:)
  for pair in pairs {
    let (key, value) = pair.split(": ")
    // Remove quotes from key and value
    key = key.slice(1, -1)
    value = value.slice(1, -1)
    result.insert(key, value)
  }
  
  return result
}

#let num1 = "{{ num1 }}"
#let num2 = "{{ num2 }}"
#let result = "{{ result }}"

#let content = [
/* START */

// See the strokes section for details on this!
#let frame(stroke) = (x, y) => (
  left: if x > 0 { 0pt } else { stroke },
  right: stroke,
  top: if y < 1 { stroke } else { 0pt },
  bottom: stroke,
)

#set table(
  fill: (_, y) => if calc.odd(y) { rgb("EAF2F5") },
  stroke: frame(rgb("21222C")),
)

#v(.5cm)

#v(.5cm)

#align(center)[

   Here is the result of #num1 + #num2 = #result


/* STOP */
]

#show: doc => pv(num1, num2, result, content)
