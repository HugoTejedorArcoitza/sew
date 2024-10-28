import xml.etree.ElementTree as ET
from pykml import factory
from pykml.factory import KML_ElementMaker as KML
from lxml import etree
import os

def generar_kml(archivo_xml, archivo_kml):
    # Cargar y parsear el archivo XML
    try:
        arbol = ET.parse(archivo_xml)
    except IOError:
        print('No se encuentra el archivo', archivo_xml)
        return
    except ET.ParseError:
        print('Error procesando el archivo XML:', archivo_xml)
        return

    # Obtener la raíz del archivo XML
    raiz = arbol.getroot()

    # Crear el elemento raíz del KML
    kml = KML.kml(
        KML.Document(
            KML.name('Circuito KML')
        )
    )

    # Obtener coordenadas principales del circuito
    longitud = raiz.find('.//{http://www.uniovi.es}coordenadas/{http://www.uniovi.es}longitud').text
    latitud = raiz.find('.//{http://www.uniovi.es}coordenadas/{http://www.uniovi.es}latitud').text
    altitud = raiz.find('.//{http://www.uniovi.es}coordenadas/{http://www.uniovi.es}altitud').text

    # Añadir el punto principal del circuito
    kml.Document.append(
        KML.Placemark(
            KML.name('Punto Principal del Circuito'),
            KML.Point(
                KML.coordinates(f"{longitud},{latitud},{altitud}")
            )
        )
    )

    # Añadir los tramos del circuito
    for tramo in raiz.findall('.//{http://www.uniovi.es}tramo'):
        lon = tramo.find('.//{http://www.uniovi.es}longitud').text
        lat = tramo.find('.//{http://www.uniovi.es}latitud').text
        alt = tramo.find('.//{http://www.uniovi.es}altitud').text

        kml.Document.append(
            KML.Placemark(
                KML.name('Tramo del Circuito'),
                KML.Point(
                    KML.coordinates(f"{lon},{lat},{alt}")
                )
            )
        )

    # Convertir el árbol KML a un string y guardarlo en un archivo
    kml_str = etree.tostring(kml, pretty_print=True).decode('utf-8')
    with open(archivo_kml, 'w', encoding='utf-8') as f:
        f.write(kml_str)
    print(f"Archivo KML '{archivo_kml}' generado con éxito.")

def generar_pdf(archivo_kml, archivo_pdf):
    # Usar Google Earth para visualizar y exportar el KML a PDF
    print(f"Abra el archivo '{archivo_kml}' en Google Earth y exporte la planimetría a un PDF manualmente.")
    # Alternativamente, se puede usar un software de captura de pantallas para automatizar este proceso.

if __name__ == "__main__":
    # Nombres de archivos
    archivo_xml = "circuitoEsquema.xml"
    archivo_kml = "circuito.kml"
    archivo_pdf = "planimetria.pdf"

    # Generar el archivo KML
    generar_kml(archivo_xml, archivo_kml)

    # Generar el archivo PDF (manual, usando Google Earth o similar)
    generar_pdf(archivo_kml, archivo_pdf)
