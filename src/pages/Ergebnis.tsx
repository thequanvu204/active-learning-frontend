import { Button, Box, Text } from "@chakra-ui/react";

const Ergebnis = () => {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "flex-start", 
      height: "300vh", 
      padding: "20px",
      backgroundColor: "#f5f5dc" // Hintergrundfarbe auf Cremeweiß geändert
    }}>
      {/* Linker Bereich mit Bildüberschrift und schwarzer Bildfläche */}
      <div>
        {/* Bildüberschrift */}
        <Text textStyle = "xl" fontSize="6xl" fontWeight="bold" mb={1}>
          Ergebnis
        </Text>

        {/* Schwarze Bildfläche (Quadrat) weiter unten */}
        <Box width="400px" height="400px" bg="black" style={{ marginTop: "200px" }} />
      </div>

      {/* Rechter roter Export-Button */}
      <Button width="100px" height= "80px" fontSize="2xl" colorPalette="red">Export</Button>
    </div>
  );
};

export default Ergebnis;