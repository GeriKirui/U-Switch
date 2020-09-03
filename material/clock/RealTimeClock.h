#include <DS3231.h>

// Initialise RTC Library
uint8_t SDA_ = SDA;
uint8_t SCL_ = SCL;
DS3231  RTC_Library(SDA_, SCL_);

class RealTimeClock {
 public:
 
 RealTimeClock() {RTC_Library.begin();}

 void setDay(int day_, int month_ , int year_){
    RTC_Library.setDate(day_, month_, year_);}
 
 void setTimeOfDay(int hour_, int min_ , int sec_){
    RTC_Library.setTime(hour_, min_, sec_);}
  
 int getHour(){return RTC_Library.getTime().hour;}
 int getMin(){return RTC_Library.getTime().min;}
 int getSec(){return RTC_Library.getTime().sec;}

 char *getDate(){return RTC_Library.getDateStr();}
 char *getDOW(){return RTC_Library.getDOWStr();}
 char *getMonth(){return RTC_Library.getMonthStr();}
  
  };
