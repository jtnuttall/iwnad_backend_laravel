<?php

use App\Models\Phase;
use Illuminate\Database\Seeder;

class PhaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $phase1 = new Phase();
        $phase1->name = 'First';
        $phase1->duedate = date("Y-m-d H:i:s");
        $phase1->description = 'description 1';
        $phase1->save();

        $phase2 = new Phase();
        $phase2->name = 'Second';
        $phase2->duedate = date("Y-m-d H:i:s");
        $phase2->description = 'description 2';
        $phase2->save();

        $phase3 = new Phase();
        $phase3->name = 'Third';
        $phase3->duedate = date("Y-m-d H:i:s");
        $phase3->description = 'description 3';
        $phase3->save();

        $phase4 = new Phase();
        $phase4->name = 'Fourth';
        $phase4->duedate = date("Y-m-d H:i:s");
        $phase4->description = 'description 4';
        $phase4->save();
    }
}
