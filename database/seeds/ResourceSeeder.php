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
        $resource1_1  = new Resource();
        $resource1_1->name = 'Are You Solving the Right Problem? (Harvard Business Review)';
        $resource1_1->link = 'https://hbr.org/2012/09/are-you-solving-the-right-problem';
        $resource1_1->phaseid = 1;
        $resource1_1->save();

        $resource1_2  = new Resource();
        $resource1_2->name = 'Problem Framing (Atlassian)';
        $resource1_2->link = 'https://www.atlassian.com/team-playbook/plays/problem-framing';
        $resource1_2->phaseid = 1;
        $resource1_2->save();

        $resource1_3  = new Resource();
        $resource1_3->name = 'Defining the Problem & Interpreting the Results';
        $resource1_3->link = 'https://www.fastcompany.com/3013968/do-you-really-understand-what-your-business-model-is';
        $resource1_3->phaseid = 1;
        $resource1_3->save();

        $resource1_4  = new Resource();
        $resource1_4->name = 'Poorly Defined Problem Areas';
        $resource1_4->link = 'https://adtmag.com/articles/2017/05/16/poorly-defined-problems.aspx';
        $resource1_4->phaseid = 1;

        $resource1_5  = new Resource();
        $resource1_5->name = 'Paul Gharam Problem Solving';
        $resource1_5->link = 'http://paulgraham.com/startupideas.html';
        $resource1_5->phaseid = 1;

        $resource2_1  = new Resource();
        $resource2_1->name = 'What is a Vision Statement? (Business News Daily)';
        $resource2_1->link = 'https://www.businessnewsdaily.com/3882-vision-statement.html';
        $resource2_1->phaseid = 2;
        $resource2_1->save();

        $resource3_1  = new Resource();
        $resource3_1->name = 'Effective Brainstorming Techniques (IDEO)';
        $resource3_1->link = 'https://www.ideou.com/pages/brainstorming';
        $resource3_1->phaseid = 3;
        $resource3_1->save();

        $resource4_1  = new Resource();
        $resource4_1->name = 'What is a Business Model?';
        $resource4_1->link = 'https://www.investopedia.com/terms/b/businessmodel.asp';
        $resource4_1->phaseid = 4;
        $resource4_1->save();

        $resource5_1  = new Resource();
        $resource5_1->name = 'Why You Should Make Time for Self-Reflection (Even If You Hate Doing It)';
        $resource5_1->link = 'https://hbr.org/2017/03/why-you-should-make-time-for-self-reflection-even-if-you-hate-doing-it';
        $resource5_1->phaseid = 5;
        $resource5_1->save();

        $resource6_1  = new Resource();
        $resource6_1->name = '6 Tips for How to Prototype a Service';
        $resource6_1->link = 'https://www.ideou.com/blogs/inspiration/6-tips-for-how-to-prototype-a-service';
        $resource6_1->phaseid = 6;
        $resource6_1->save();

        $resource7_1  = new Resource();
        $resource7_1->name = 'What is Iterative Design? (and Why You Should Use It)';
        $resource7_1->link = 'https://enginess.io/insights/what-is-iterative-design';
        $resource7_1->phaseid = 7;
        $resource7_1->save();

        $resource8_1  = new Resource();
        $resource8_1->name = 'How to Create a Pitch Deck (Forbes)';
        $resource8_1->link = 'https://www.forbes.com/sites/alejandrocremades/2018/03/02/how-to-create-a-pitch-deck/#1e590bf56c06';
        $resource8_1->phaseid = 8;
        $resource8_1->save();

        $resource9_1  = new Resource();
        $resource9_1->name = 'Types of Growth Strategies';
        $resource9_1->link = 'https://www.1819.brussels/en/growing-your-business/growth-strategies/types-growth-strategies';
        $resource9_1->phaseid = 9;
        $resource9_1->save();



    }
}
