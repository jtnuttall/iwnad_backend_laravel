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
        $phase1->name = 'Research the Problem';
        $phase1->duedate = '2 weeks';
        $phase1->description = 'Pick your problem space. Know everything about it.';
        $phase1->save();

        $phase2 = new Phase();
        $phase2->name = 'Establish a Vision';
        $phase2->duedate = '2 weeks';
        $phase2->description = 'What would the world look like with your problem solved?';
        $phase2->save();

        $phase3 = new Phase();
        $phase3->name = 'Determine a Solution';
        $phase3->duedate = '2 weeks';
        $phase3->description = 'How might you help solve this problem? ';
        $phase3->save();

        $phase4 = new Phase();
        $phase4->name = 'Define a Business Model';
        $phase4->duedate = '2 weeks';
        $phase4->description = 'Prove you can do it.';
        $phase4->save();

        $phase5 = new Phase();
        $phase5->name = 'Reflect';
        $phase5->duedate = '1 week';
        $phase5->description = 'What are you learning?';
        $phase1->save();

        $phase6 = new Phase();
        $phase6->name = 'Prototype';
        $phase6->duedate = '4 weeks';
        $phase6->description = 'MVPs have MVPs. ';
        $phase6->save();

        $phase7 = new Phase();
        $phase7->name = 'Iterate';
        $phase7->duedate = '1 week';
        $phase7->description = 'How can you improve your product/program? ';
        $phase7->save();

        $phase8 = new Phase();
        $phase8->name = 'Create Your Pitch Deck';
        $phase8->duedate = '4 weeks';
        $phase8->description = 'Convince us its worth our time.';
        $phase8->save();

        $phase9 = new Phase();
        $phase9->name = 'Looking Forward';
        $phase9->duedate = '1 week';
        $phase9->description = 'Given the investors advice, your own reflections, and your mentor's feedback, what's your next step?';
        $phase9->save();

    }
}
