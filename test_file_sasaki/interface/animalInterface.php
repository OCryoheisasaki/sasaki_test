<?php

class Animal implements animalInterface {
    //名前
    public readonly string $name;

    //運動能力
    public readonly int $athletic_ability;

    //知能指数
    public readonly int $intelligence;
    //鳴き声
    public readonly string $cry;

    public function __construct(string $name, int $athletic_ability, int $intelligence, string $cry) {
        $this->name = $name;
        $this->athletic_ability = $athletic_ability;
        $this->intelligence = $intelligence;
        $this->cry = $cry;
    }

    public function getName(): string {
        return $this->name;
    }

    public function getAthleticAbility(): int {
        return $this->athletic_ability;
    }

    public function getIntelligence(): int {
        return $this->intelligence;
    }

    public function getCry(): string {
        return $this->cry;
    }

    public function HighAthleticAbilitySkill(): string {
        if ($this->athletic_ability > 150) {
            return "{$this->name}は空中で1回転した";
        } else {
            return "{$this->name}はこけた";
        }
    }

    public function HighIntelligenceSkill(): string {
        if ($this->intelligence > 180) {
            return "{$this->name}はモネの睡蓮を描いた";
        } else {
            return "{$this->name}は絵具を食べ始めた";
        }
    }
}

class Monkey extends Animal {
    public function __construct() {
        parent::__construct("Ape", rand(100, 200), rand(150, 200), "ウキー");
    }
}

class Chimpanzee extends Animal {
    public function __construct() {
        parent::__construct("Chimpanzee", rand(80,180), rand(200, 300), "ウキー");
    }
}

class Cat extends Animal {
    public function __construct() {
        parent::__construct("Cat", 50, rand(80, 120), "ネコと和解せよ");
    }
}

interface animalInterface {
    public function getName() : string;
    public function getAthleticAbility(): int;
    public function getIntelligence(): int;
    public function getCry(): string;
    public function HighAthleticAbilitySkill(): string;
    public function HighIntelligenceSkill(): string;
}