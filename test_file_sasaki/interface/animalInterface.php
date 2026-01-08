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

class Monkey extends Animal implements spinInTheAir ,drawPicture{
    public function __construct() {
        parent::__construct("Ape", rand(100, 200), rand(150, 200), "ウキー");
    }

    public function spinInTheAir(): string {
        if ($this->athletic_ability > 150) {
            return "{$this->name}は空中で1回転した";
        } else {
            return "{$this->name}はこけた";
        }
    }

    public function drawPicture(): string {
        if ($this->intelligence > 180) {
            return "{$this->name}はモネの睡蓮を描いた";
        } else {
            return "{$this->name}は絵具を食べ始めた";
        }
    }
}

class Chimpanzee extends Animal implements spinInTheAir ,drawPicture{
    public function __construct() {
        parent::__construct("Chimpanzee", rand(80,180), rand(200, 300), "ウキー");
    }

    public function spinInTheAir(): string {
        if ($this->athletic_ability > 150) {
            return "{$this->name}は空中で1回転した";
        } else {
            return "{$this->name}はこけた";
        }
    }

    public function drawPicture(): string {
        return "{$this->name}はモネの睡蓮を描いた";
    }
}

class Cat extends Animal implements spinInTheAir {
    public function __construct(string $name) {
        parent::__construct($name, rand(300, 400), 50, "ネコと和解せよ");
    }

    public function spinInTheAir(): string {
        return "{$this->name}は空中で1回転した";
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

interface spinInTheAir {
    public function spinInTheAir(): string;
}

interface drawPicture {
    public function drawPicture(): string;
}