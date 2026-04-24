@echo off
setlocal enabledelayedexpansion

set "inputFile=css\styles.css"
set "outputFile=css\styles_temp.css"

(for /f "delims=" %%a in (%inputFile%) do (
    set "line=%%a"
    
    REM Replace common rem values with px
    set "line=!line:0.1rem=1.6px!"
    set "line=!line:0.4rem=6.4px!"
    set "line=!line:0.5rem=8px!"
    set "line=!line:0.7rem=11.2px!"
    set "line=!line:0.8rem=12.8px!"
    set "line=!line:0.9rem=14.4px!"
    set "line=!line:1rem=16px!"
    set "line=!line:1.2rem=19.2px!"
    set "line=!line:1.4rem=22.4px!"
    set "line=!line:1.5rem=24px!"
    set "line=!line:2rem=32px!"
    set "line=!line:2.5rem=40px!"
    set "line=!line:3rem=48px!"
    set "line=!line:4rem=64px!"
    set "line=!line:5rem=80px!"
    set "line=!line:8rem=128px!"
    
    echo !line!
)) > %outputFile%

move /y %outputFile% %inputFile%
echo Conversion complete!
