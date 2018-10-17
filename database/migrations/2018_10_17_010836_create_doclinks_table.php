<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateDoclinksTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('doclinks', function(Blueprint $table)
		{
			$table->integer('doclinkid', true);
			$table->string('link', 256);
			$table->integer('dashboardid')->index('fk_doclinks_dashboards1_idx');
			$table->integer('phaseid')->index('fk_doclinks_phases1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('doclinks');
	}

}
