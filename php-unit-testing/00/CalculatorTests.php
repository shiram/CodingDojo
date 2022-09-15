<?php

require 'Calculator.php';

class CalculatorTests extends \PHPUnit\Framework\TestCase
{
    private $calculator;

    protected function setUp() {
        $this->calculator = new Calculator();
    }

    protected function tearDown() {
        $this->calculator = NULL;
    }

    public function addDataProvider() {
        return array(
            array(1, 2, 3),
            array(0, 0, 0),
            array(-1, -1, -2),
        );
    }

    public function subtractDataProvider() {
        return array(
            array(2, 1, 1),
            array(1, 9, -8),
            array(8, 5, 3),
        );
    }

    public function divideDataProvider() {
        return array(
            array(6, 3, 2),
            array(5, 2, 2.5),
            array(28, 7, 4),
        );
    }

    public function multiplyDataProvider() {
        return array(
            array(2, 1, 2),
            array(2, 9, 18),
            array(8, 5, 40),
        );
    }

    /**
     *  @dataProvider addDataProvider
     */
    public function testAdd($a, $b, $expected) {
        $result =  $this->calculator->add($a, $b);
        $this->assertEquals($expected, $result);
    }

    /**
     *  @dataProvider subtractDataProvider
     */
    public function testSubtract($a, $b, $expected) {
        $result = $this->calculator->subtract($a, $b);
        $this->assertEquals($expected, $result);
    }

    /**
     *  @dataProvider divideDataProvider
     */
    public function testDivide($a, $b, $expected) {
        $result = $this->calculator->divide($a, $b);
        $this->assertEquals($expected, $result);
    }

    /**
     *  @dataProvider multiplyDataProvider
     */
    public function testMultiply($a, $b, $expected) {
        $result = $this->calculator->multiply($a, $b);
        $this->assertEquals($expected, $result);
    }
}