<?php

/**
 * 
 *      
#When to use test double

As mentioned in the first part of this series. One of PHPUnit's powerful features is test double. It is very common in our code, a function of one class is calling another class's function. In this case, we have a dependency in these two classes. In particular, the caller class has a dependency on calling class. But as we already know in part 1, unit test should test the smallest unit of functionality, in this case, it should test only the caller function. To solve this problem, We can use test double to replace the calling class. Since a test double can be configured to return predefined results, we can focus on testing the caller function.
#Types of test doubles

Test double is a generic term for objects we use, to replace real production ready objects. In our opinion, it is very useful to categorize test doubles by their purpose. It does not only make it easy for us to understand the test case, but also make our code friendly to other parties.

Accordingly to Martin Fowler's post, There are five types of test double:

    Dummy objects are passed around but never actually used. Usually they are just used to fill parameter lists.
    Fake objects actually have working implementations, but usually take some shortcut which makes them not suitable for production.
    Stubs provide canned answers to calls made during the test, usually not responding at all to anything outside what's programmed in for the test.
    Spies are stubs that also record some information based on how they were called. One form of this might be an email service that records how many messages it was sent.
    Mocks are pre-programmed with expectations which form a specification of the calls they are expected to receive. They can throw an exception if they receive a call they don't expect and are checked during verification to ensure they got all the calls they were expecting.

#How to create test double

PHPUnit's method getMockBuilder can be used to create any similar user defined objects. Combining with its configurable interface. We can use it to create basically all five types of test doubles.
 */

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


    /**
     *  @dataProvider addDataProvider
     */
    public function testWithStub($a, $b, $expected) {
        //create stub for Calculator class
        $calculator = $this->getMockBuilder('Calculator')
                            ->getMock();

        //configure the stub
        $calculator->expects($this->any())
                    ->method('add')
                    ->will($this->returnValue($expected));

        $this->assertEquals($expected, $calculator->add($a, $b));
    }
}