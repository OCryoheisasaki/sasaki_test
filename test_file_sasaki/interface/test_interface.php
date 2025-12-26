<?php
$animals = [
    new Cat(),
    new Monkey(),
    new Chimpanzee()
];

foreach ($animals as $animal) {
    echo $animal->HighIntelligenceSkill() . "<br>";
}