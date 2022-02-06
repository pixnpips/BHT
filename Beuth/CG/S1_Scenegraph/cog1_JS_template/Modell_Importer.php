<?php

// @author: Philipp Busse, s60120@beuth-hochschule.de
// @version: 1.3

// SETTINGS
$objFile    = 'myModel2.obj';       // 'dynamic' or filename or 'get';
$importDir  = 'obj/';               // directory for obj-data
$targetDir  = 'cog1/modelData/';    // directory for target-file
$myModel    = 'myBlenderModell.js';  // target-file
$mode       = 'file';               // 'file' = print to file $myModel / 'echo' = print to screen (can be used for dynamic reading)

$color      = 'rainbow';            // 'red','green','blue','cyan','pink','yellow','black','rainbow','random'
$showInfo   = true;                 // get some statistics on job done
$rescaling  = true;                 // rescales the object to fit screen
$deltaXMax  = 400;                  // maximum width resolution of the object
$deltaYMax  = 800;                  // maximum height resolution of the object
// END OF SETTINGS


$help = '
<b>Hilfe:</b>

<b>Installation:</b>
- das php-script gehört ins root-Verzeichnis, neben die index.html-Datei
- die obj-Datei ins Unterverzeichnis "'.$importDir.'"


<b>Funktion:</b>
$objFile = "dynamic":
- das script durchsucht das Unterverzeichnis "'.$importDir.'" nach obj-Dateien
- nach Auswahl wird das obj konvertiert

$objFile = "Dateiname":
- wird ein Dateiname angegeben, wird das obj automatisch konvertiert, ohne Auswahl-Menü

$objFile = "get":
- der Dateiname wird via $_GET übergeben (z.B. objImporter.php&obj=test.obj)


$mode = "file":
- das Obj wird als Datei abgespeichert

$mode = "echo":
- das Obj wird an die aufrufende Instanz zurückgegeben (z.B. Screen)
  dadurch lässt sich das script via javascript einbinden
  

<b>Farben:</b>
- falls das obj mehrere unabhängige Objekte enthällt,
  wird durch Auswahl der Option "random" oder "rainbow" jedes Objekt unterschiedlich eingefärbt
';


$helpLink = '<br><br><a href="objImporter.php?help" style="color:blue;"><pre>Hilfe</pre></a>';

if (isset($_GET["help"])) {
    echo '<pre>';
    echo $help;
    echo '</pre>';
    exit;
}

// --- DON'T TOUCH ANYTHING BELOW ---//
$path_current = dirname( __FILE__ );
$path_root = $_SERVER['DOCUMENT_ROOT'];
$colors = array('red','green','blue','cyan','pink','yellow','black','rainbow','random');

// scan dir for obj, exit if empty
$files = scandir($importDir);
$files_length = count($files);

$obj = array();

for ($j=2; $j<$files_length; $j++) {
    if (get_ext($files[$j]) == 'obj') {
        $obj[] = $files[$j];
    }
}

$obj_length = count($obj);

// quit if no obj-files where found
if ($obj_length == 0) {
    echo '<pre>';
    echo '<span style="color:red; font-weight:bold;">[ERROR] nothing to import!</span>';
    echo '</pre>';
    exit;
}


// base parts
$base1 = '/**
 * object created by objImporter
 */
define(["exports", "data"], function(exports, data) {
	"use strict";

	/**
	 * Create an instance of the model defined in this module.
	 * 
	 * @parameter object with fields:
	 * @returns instance of this model.
	 */
	exports.create = function(parameter) {
		
        // Instance of the model to be returned.
		var instance = {};

		instance.vertices = [
';
$base2 = '];
		instance.polygonVertices = [
';
$base3 ='];	
		instance.polygonColors = [';
$base4 = '];
		
		return instance;		
	};
});';


// SET VALUES on $_GET attributes
if (isset($_GET["obj"])) {
    $obj = $_GET["obj"];
    
    if (isset($_GET["rescaling"])) {
        $rescaling = $_GET["rescaling"];
    }
    
    if (isset($_GET["color"])) {
    $color = $_GET["color"];
        switch ($color) {
            case '7':
                $polygonColor = 'rainbow';
                break;
            case '8':
                $polygonColor = 'random';
                break;
            default:
                $polygonColor = $color;
                break;
        }
    } else {
        $polygonColor = 0;
    }


// SEARCH FOR OBJ-FILES AND CREATE FORM-DATA    

// search for obj-files
} else {
    // dynamic filename
    switch($objFile) {
            
        case 'dynamic': 

            // show selection menu
            echo '<pre>';
            echo '<form action="objImporter.php" method="get">';

            // obj
            echo 'obj:   ';
            echo '<select name="obj">';
            for ($i=0; $i<$obj_length; $i++) {
                echo '<option value="'.$obj[$i].'">'.$obj[$i].'</option>';
            }
            echo '</select><br>';

            // color
            echo 'Color: ';
            echo '<select name="color">';
            $color = array_search($color, $colors);
            for ($i=0; $i<9; $i++) {
                echo '<option value="'.$i.'"';
                if ($i == $color) echo ' selected';
                echo '>'.$colors[$i].'</option>';
            }
            echo '</select><br>';

            echo '<br><button type="submit">Konvertieren</button>';
            echo '</pre>';
            
            echo $helpLink;
            
            exit;

            break;
            
        case 'get':
            echo '<pre>';
            echo '<span style="color:red; font-weight:bold;">[ERROR] no obj-file received</span>';
            echo $helpLink;
            echo '</pre>';
            exit;
            
            break;

        // given filename
        default:
            $obj = $objFile;
            $polygonColor = $color;
            
            break;
    }
}

// helper function to determine file-extension
function get_ext ($file) {
    $ext = explode('.', $file);
    return $ext[count($ext)-1];
}


// CONVERTING PART

// read obj
$content = file($importDir.$obj);
if ($content == false) {
    echo '<pre>';
    echo '<span style="color:red; font-weight:bold;">[ERROR] file "./'.$importDir.$objFile.'" does not exist!</span>';
    echo '</pre>';
    exit;
}
$length = count($content);

// predefine some stuff
$vertices  = array();
$polygons  = array();
$objects   = array();
$polycount = 0;

// detect vertices and poligons
for ($i=0; $i<$length; $i++) {
    
    // vertices
	if (strpos ($content[$i], 'v ') !== false) {
        $values = explode(" ", $content[$i]);
        // strip off the line break of the third value
        $vertices[] = array($values[1],$values[2],str_replace(array("\r", "\n"), '', $values[3]));
    }
    
    // polygons
    if (strpos ($content[$i], 'f ') !== false) {
        $polycount++;
        
        // each object starts at a new section in the obj-file
        // we can use this to alter the color by object
        // use 'rainbow' or 'random' as color
        if ($polycount>1 && (strpos ($content[$i-1], 'f ') === false)) {
            $objects[] = $polycount;
        }
        
        $values = explode(' ', $content[$i]);
        $values_length = count($values);
        $poly = array();
        
        for ($j=1; $j<$values_length; $j++) {
            $val = explode('/', $values[$j]);
            $poly[] = $val[0]-1;
        }
        
        $polygons[] = $poly;
    }
}


// create predefined model-data
$model = $base1;

$vertices_count = count($vertices);


// get rescaling multiplier
if ($rescaling == true) {
    $scaleX = array($vertices[0][0],$vertices[0][0]);
    $scaleY = array($vertices[0][1],$vertices[0][1]);

    for ($i=1; $i<$vertices_count; $i++) {
        if ($vertices[$i][0] < $scaleX[0]) {
            $scaleX[0] = $vertices[$i][0];
        }
        if ($vertices[$i][0] > $scaleX[1]) {
            $scaleX[1] = $vertices[$i][0];
        }
        if ($vertices[$i][1] < $scaleY[0]) {
            $scaleY[0] = $vertices[$i][1];
        }
        if ($vertices[$i][1] > $scaleY[1]) {
            $scaleY[1] = $vertices[$i][1];
        }
    }

    $deltaX   = abs($scaleX[1]-$scaleX[0]);
    $deltaY   = abs($scaleY[1]-$scaleY[0]);
    /*
    if ($deltaX == 0) $deltaX++;
    if ($deltaY == 0) $deltaY++;
    */
    if ($deltaX == 0 or $deltaY == 0) {
        $scaling = 1;
    } else {
        $scalingX = round($deltaXMax / $deltaX, 2);
        $scalingY = round($deltaYMax / $deltaY, 2);

        if ($scalingX >= $scalingY) {
            $scaling = $scalingX;
        } else {
            $scaling = $scalingY;
        }
    }
} else {
    $scaling = 1;
}

// print vertices
for ($i=0; $i<$vertices_count; $i++) {
    $model .= '                 ['.$vertices[$i][0]*$scaling.','.$vertices[$i][1]*$scaling.','.$vertices[$i][2]*$scaling.']';
    if ($i+1 < $vertices_count) {
        $model .= ",\n";
    }
}

// create predefined model-data
$model .= $base2;

// print polygons
$polygons_count = count($polygons);
for ($i=0; $i<$polygons_count; $i++) {
    $model .= '                 [';
    
    $polygon_vertices = count($polygons[$i]);
    for ($j=0; $j<$polygon_vertices; $j++) {
        $model .= $polygons[$i][$j];
        if ($j+1 < $polygon_vertices) {
            $model .= ',';
        }
    }
    if ($i+1 < $polygons_count) {
        $model .= "],\n";
    } else {
        $model .= "]";
    }
}

// create predefined model-data
$model .= $base3;

$objects_count = count($objects);

// print colors for multiple objects
if ($objects_count >= 1) {
    $color_array = array();
    switch ($polygonColor) {
        case 'random':
            for ($i=0; $i<=$objects_count; $i++) {
                $color_array[] = rand(0, 6);
            }
            break;
        case 'rainbow':
            for ($i=0; $i<=$objects_count; $i++) {
                $color_array[] = $i%7;
            }
            break;
        default:
            for ($i=0; $i<=$objects_count; $i++) {
                $color_array[] = $polygonColor;
            };
            break;
    }
    
    $selector = 0;
    for ($i=0; $i<$polygons_count; $i++) {
        if (isset($objects[$selector]) && $i>=$objects[$selector] && $selector<$objects_count) {
            $selector++;
        }
        $model .= $color_array[$selector%7];
        if ($i+1<$polygons_count) {
            $model .=',';
        }
    }

    
// print colors for single object
} else {
    for ($i=0; $i<$polygons_count; $i++) {
        switch ($polygonColor) {
            case 'random':
                $color = rand(0, 6);
                break;
            case 'rainbow':
                $color = ($i%7);
                break;
            default:
                $color = $polygonColor;
                break;
        }
        $model .= $color;
        if ($i+1<$polygons_count) {
            $model .=',';
        }
    }
}

// create predefined model-data
$model .= $base4;

// prompt to file or screen / option for dynamic file import via JS/AJAX
if ($mode == 'file') {
    $fp = fopen($path_current.'/'.$targetDir.$myModel, 'w');
    fwrite($fp, $model);
    fclose($fp);
    
    // print some statistics
    if ($showInfo == true) {
        echo '<pre>';

        echo '<b>File Info</b>'."\n";
        echo ' import:   ./'.$importDir.$obj."\n";
        echo ' export:   ./'.$targetDir.$myModel."\n";
        echo "\n";

        echo '<b>Object Info</b>'."\n";
        echo ' vertices: '.$vertices_count."\n";
        echo ' polygons: '.$polygons_count."\n";
        echo ' objects:  '.($objects_count+1)."\n";
        echo "\n";

        echo '<b>Scene Info</b>'."\n";
        if (is_numeric($polygonColor) == true) {
            echo ' color:    '.$colors[$polygonColor]."\n";
        } else {
            if ($objects_count = 0) {
                echo ' color:    '.$polygonColor." (by polygon)\n";
            } else {
                echo ' color:    '.$polygonColor." (by object)\n";
            }
        }

        if ($rescaling == false) {
            echo ' scaling:  default'."\n";
        } else {
            echo ' scaling:  '.$scaling."\n";
        }

        echo '</pre>';
    }
}

if ($mode == 'echo') {
    echo '<pre>';
    echo $model;
    echo '</pre>';
}

?>