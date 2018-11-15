<?php

use Illuminate\Database\Seeder;
use App\Models\Resource;


class ResourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $resource1  = new Resource();
        $resource1->name = 'Are You Solving the Right Problem? (Harvard Business Review)';
        $resource1->link = 'https://hbr.org/2012/09/are-you-solving-the-right-problem';
        $resource1->phaseid = 1;
        $resource1->save();

        $resource2  = new Resource();
        $resource2->name = 'Problem Framing (Atlassian)';
        $resource2->link = 'https://www.atlassian.com/team-playbook/plays/problem-framing';
        $resource2->phaseid = 1;

        $resource3  = new Resource();
        $resource3->name = 'Defining the Problem & Interpreting the Results';
        $resource3->link = 'https://www.fastcompany.com/3013968/do-you-really-understand-what-your-business-model-is';
        $resource3->phaseid = 1;
        $resource3->save();

        $resource4  = new Resource();
        $resource4->name = 'Poorly Defined Problem Areas';
        $resource4->link = 'https://adtmag.com/articles/2017/05/16/poorly-defined-problems.aspx';
        $resource4->phaseid = 1;

        $resource5  = new Resource();
        $resource5->name = 'Paul Gharam Problem Solving';
        $resource5->link = 'http://paulgraham.com/startupideas.html';
        $resource5->phaseid = 1;



    }
}
