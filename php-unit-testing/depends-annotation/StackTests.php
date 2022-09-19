<?php
require 'Stack.php';

class StackTests extends \PHPUnit\Framework\TestCase {

    private $stack;

    protected function setUp() {
        $this->stack = new Stack();
    }

    protected function tearDown() {
        $this->stack = NULL;
    }

    public function testIsEmpty() {
        $result = $this->stack->isEmpty();
        $this->assertEmpty($this->stack->stack);
        $this->assertEquals(true, $result);
        return $this->stack;
    }

    /**
     *  @depends testIsEmpty
     */
    public function testPush($testStack) {
        $testStack->push('id');
        $this->assertEquals('id', $testStack->stack[count($testStack->stack) - 1]);
        $this->assertNotEmpty($testStack->stack);
        return $testStack;
    }

    /**
     *  @depends testPush
     */
    public function testPop($testStack) {
        $this->assertEquals('id', $testStack->pop());
        $this->assertEmpty($testStack->stack);
    }

}