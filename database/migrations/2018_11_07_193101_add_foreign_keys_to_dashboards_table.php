<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToDashboardsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('dashboards', function(Blueprint $table)
		{
			$table->foreign('pairingid', 'fk_dashboards_pairings1')
				->references('pairingid')
				->on('pairings')
				->onUpdate('NO ACTION')
				->onDelete('CASCADE');

			// $table->foreign('currentphaseid', 'fk_dashboards_phases1')
				->references('phaseid')
				->on('phases')
				->onUpdate('NO ACTION')
				->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('dashboards', function(Blueprint $table)
		{
			$table->dropForeign('fk_dashboards_pairings1');
			$table->dropForeign('fk_dashboards_phases1');
		});
	}

}
