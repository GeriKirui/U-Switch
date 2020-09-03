#include "RealTimeClock.h"

RealTimeClock rtc;

// control times of a geyser* the best way to regulate the geyser with a preset timer.

// morning period
const int ontime_hr_mn = 23;
const int ontime_min_mn = 05;
const int offtime_hr_mn =  23;
const int offtime_min_mn = 05;



// evening period
const int ontime_hr_ev = 17;
const int ontime_min_ev = 30;
const int offtime_hr_ev = 19;
const int offtime_min_ev = 30;

const byte sound = A0;

void setup()
{
  // Setup Serial connection
  Serial.begin(115200);

//output in this case is the LED
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(sound, OUTPUT);
 
// The following lines can be uncommented to set the date and time
// rtc.setDOW(SATURDAY);     //Set Day-of-Week to SUNDAY
// rtc.setTime(22, 24, 20);  //Set the time to 12:00:00 (24hr format)
// rtc.setDate(29, 8, 2020); //Set the date to January 1st, 2014

//rtc.setTimeOfDay(22,29,30);
}

double calcHour(int hour_, int min_)
{ return double(hour_+double(min_/60.0)); }

void loop()
{
//   Serial.print(rtc.getDOW());
//   Serial.print(" ");
//   Serial.print(rtc.getDate());
//   Serial.print(" -- ");
   Serial.print(rtc.getHour());
   Serial.print(":");
   Serial.print(rtc.getMin());
   Serial.print(":");
   Serial.println(rtc.getSec());


// morning on
if (calcHour(rtc.getHour(),rtc.getMin()) >= calcHour(ontime_hr_mn,ontime_min_mn)
  &&
  calcHour(rtc.getHour(),rtc.getMin()) <= calcHour(offtime_hr_mn,offtime_min_mn)
)
 { 
  digitalWrite(sound, HIGH);
  delay (1500);
  digitalWrite(sound, LOW);
  digitalWrite(LED_BUILTIN, HIGH);
  Serial.println("ON");
 }
else
{
digitalWrite(LED_BUILTIN, LOW);
Serial.println("OFF");
}

Serial.println(calcHour(rtc.getHour(),rtc.getMin()));

  delay (1000);
}
