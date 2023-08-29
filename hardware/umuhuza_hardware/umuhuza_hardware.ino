// the library for the finger print sensor
#include <Adafruit_Fingerprint.h>
//libraries for the esp8266 to send data to the internet
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
// arduino json library
#include <ArduinoJson.h>
// software serail ports for the finger print sensor
SoftwareSerial mySerial(D2, D3);

Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

uint8_t id;  //variable to hold the id of the fingerprint

const char* ssid = "BLOCK2";         // change this to your wireless network
const char* password = "Admin@123";  // change this to your password network
//Your Domain name with URL path or IP address with path
const char* serverName = "http://172.16.3.58/umuhuzaBackend/api/hardWareApi.php";
const char* serverNameGet = "http://172.16.3.58/umuhuzaBackend/api/hardWareApi.php?task=getFingerID";  // to get the user information
const char* serverNamereg = "http://172.16.3.58/umuhuzaBackend/api/hardWareApi.php?task=regFingerID";
const char* serverNameverify = "http://172.16.3.58/umuhuzaBackend/api/hardWareApi.php?task=verify";
int stateToggle = D5;  // defined the toogle switch to change btn register and verify
void WiFi_SetUp() {
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
}

void setup() {
  Serial.begin(9600);
  while (!Serial)
    ;
  delay(100);

  finger.begin(57600);

  if (finger.verifyPassword()) {
    Serial.println("Found fingerprint sensor!");
  } else {
    Serial.println("Did not find fingerprint sensor :(");
    while (1) { delay(1); }
  }

  finger.getParameters();

  finger.getTemplateCount();

  if (finger.templateCount == 0) {
    Serial.print("Sensor doesn't contain any fingerprint data. Please enroll the finger prints first  ");
  }

  WiFi_SetUp();
  //define the pinmodes of the GPIO's
  pinMode(stateToggle, INPUT);
}

uint8_t readnumber(void) {
  uint8_t num = 0;

  while (num == 0) {

    num = getFingerID();
  }


  return num;
}

void loop() {
  if (digitalRead(stateToggle) == LOW) {
    Serial.println("Ready to enroll a fingerprint!");
    Serial.println("Please type in the ID # (from 1 to 127) you want to save this finger as...");
    id = readnumber();
    if (id == 0) {  // ID #0 not allowed, try again!
      return;
    }
    Serial.print("Enrolling ID #");
    Serial.println(id);

    while (!getFingerprintEnroll())
      ;
  } else {
    getFingerprintID();
    delay(50);
  }
}
uint8_t getFingerprintID() {
  uint8_t p = finger.getImage();
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image taken");
      break;
    case FINGERPRINT_NOFINGER:
      Serial.println("No finger detected");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    case FINGERPRINT_IMAGEFAIL:
      Serial.println("Imaging error");
      return p;
    default:
      Serial.println("Unknown error");
      return p;
  }

  // OK success!

  p = finger.image2Tz();
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return p;
    default:
      Serial.println("Unknown error");
      return p;
  }

  // OK converted!
  p = finger.fingerSearch();
  if (p == FINGERPRINT_OK) {
    Serial.println("Found a print match!");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return p;
  } else if (p == FINGERPRINT_NOTFOUND) {
    Serial.println("Did not find a match");
    return p;
  } else {
    Serial.println("Unknown error");
    return p;
  }

  // found a match!
  Serial.print("Found ID #");
  Serial.print(finger.fingerID);
  //fingerPrintID=finger.fingerID;
  verifyFingerID(finger.fingerID);
  Serial.print(" with confidence of ");
  Serial.println(finger.confidence);

  return finger.fingerID;
}

uint8_t getFingerprintEnroll() {

  int p = -1;
  Serial.print("Waiting for valid finger to enroll as #");
  Serial.println(id);
  while (p != FINGERPRINT_OK) {
    if (digitalRead(stateToggle) == HIGH) {
      return true;
    }
    p = finger.getImage();
    switch (p) {
      case FINGERPRINT_OK:
        Serial.println("Image taken");
        break;
      case FINGERPRINT_NOFINGER:
        Serial.println(".");
        break;
      case FINGERPRINT_PACKETRECIEVEERR:
        Serial.println("Communication error");
        break;
      case FINGERPRINT_IMAGEFAIL:
        Serial.println("Imaging error");
        break;
      default:
        Serial.println("Unknown error");
        break;
    }
  }

  // OK success!

  p = finger.image2Tz(1);
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return p;
    default:
      Serial.println("Unknown error");
      return p;
  }

  Serial.println("Remove finger");
  delay(2000);
  p = 0;
  while (p != FINGERPRINT_NOFINGER) {
    if (digitalRead(stateToggle) == HIGH) {
      return true;
    }
    p = finger.getImage();
  }
  Serial.print("ID ");
  Serial.println(id);
  p = -1;
  Serial.println("Place same finger again");
  while (p != FINGERPRINT_OK) {
    if (digitalRead(stateToggle) == HIGH) {
      return true;
    }
    p = finger.getImage();
    switch (p) {
      case FINGERPRINT_OK:
        Serial.println("Image taken");
        break;
      case FINGERPRINT_NOFINGER:
        Serial.print(".");
        break;
      case FINGERPRINT_PACKETRECIEVEERR:
        Serial.println("Communication error");
        break;
      case FINGERPRINT_IMAGEFAIL:
        Serial.println("Imaging error");
        break;
      default:
        Serial.println("Unknown error");
        break;
    }
  }

  // OK success!

  p = finger.image2Tz(2);
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return p;
    default:
      Serial.println("Unknown error");
      return p;
  }

  // OK converted!
  Serial.print("Creating model for #");
  Serial.println(id);

  p = finger.createModel();
  if (p == FINGERPRINT_OK) {
    Serial.println("Prints matched!");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return p;
  } else if (p == FINGERPRINT_ENROLLMISMATCH) {
    Serial.println("Fingerprints did not match");
    return p;
  } else {
    Serial.println("Unknown error");
    return p;
  }

  Serial.print("ID ");
  Serial.println(id);
  p = finger.storeModel(id);
  if (p == FINGERPRINT_OK) {
    Serial.println("Stored!");
    regFingerID();
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return p;
  } else if (p == FINGERPRINT_BADLOCATION) {
    Serial.println("Could not store in that location");
    return p;
  } else if (p == FINGERPRINT_FLASHERR) {
    Serial.println("Error writing to flash");
    return p;
  } else {
    Serial.println("Unknown error");
    return p;
  }

  return true;
}

uint8_t getFingerID() {
  uint8_t fingerPrintID = 0;
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;
    http.begin(client, serverNameGet);
    int httpResponseCode = http.GET();
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    if (httpResponseCode == 200) {
      String payload = http.getString();
      Serial.println(payload);

      StaticJsonDocument<90> doc;
      DeserializationError error = deserializeJson(doc, payload);

      if (error) {
        Serial.print(F("deserializeJson() failed: "));
        Serial.println(error.f_str());
        return 0;
      }

      fingerPrintID = doc["fingerprintID"];
    } else {
      // when the request was not received by the server
    }
    http.end();
  } else {
    Serial.println("WiFi Disconnected");
  }
  return fingerPrintID;
}


void regFingerID() {

  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;
    http.begin(client, serverNamereg);
    int httpResponseCode = http.GET();
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    if (httpResponseCode == 200) {
      String payload = http.getString();
      Serial.println(payload);
      StaticJsonDocument<90> doc;
      DeserializationError error = deserializeJson(doc, payload);

      if (error) {
        Serial.print(F("deserializeJson() failed: "));
        Serial.println(error.f_str());
        return;
      }

      int success = doc["success"];
      if (success == 1) {
        Serial.println("finger print id written sucessfuly");
      } else {
        Serial.println("failed to write finger print id on the server ");
      }
    } else {
      // when the request was not received by the server
    }
    http.end();
  } else {
    Serial.println("WiFi Disconnected");
  }
}

void verifyFingerID(int fingerPrintID) {
 Serial.println(fingerPrintID);
 delay(1000);
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;
    http.begin(client, serverNameverify);
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    String httpRequestData ="finger="+String(fingerPrintID);
    int httpResponseCode = http.POST(httpRequestData);
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    if (httpResponseCode == 200) {
      String payload = http.getString();
      Serial.println(payload);
      StaticJsonDocument<90> doc;
      DeserializationError error = deserializeJson(doc, payload);

      if (error) {
        Serial.print(F("deserializeJson() failed: "));
        Serial.println(error.f_str());
        return;
      }

      int success = doc["success"];
      if (success == 1) {
        Serial.println("finger print found");
      } else {
        Serial.println("No finger print found ");
      }
    } else {
      // when the request was not received by the server
    }
    http.end();
  } else {
    Serial.println("WiFi Disconnected");
  }
}
