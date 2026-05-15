@echo off
echo Configurando Git...

REM Define diretamente o nome de usuário e e-mail

REM Configurações globais do Git
git config --global user.name "%lorenzokml%"
git config --global user.email "%lorenzodev2009@gmail.com%"

echo.
echo Configurações aplicadas com sucesso:
git config --global user.name
git config --global user.email

exit
