@inject('carbon', 'Carbon\Carbon')
<tr>
  <td style="padding: 30px 28px 10px; font-family: Arial, Helvetica, sans-serif; color: #171717;">

    <!-- Título -->
    <h2 style="margin: 0 0 8px; font-family: Arial, Helvetica, sans-serif; font-size: 23px; line-height: 1.4; color: #171717;">
      Bedankt voor uw vertrouwen!
    </h2>

    <!-- Subtítulo -->
    <p style="margin: 0 0 22px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.7; color: #666666;">
      Bedankt voor het accepteren van onze offerte
    </p>

    <!-- Saudação -->
    <p style="margin: 0 0 18px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.7; color: #171717;">
      Beste <strong>{{$dados->cliente->cli_nome}}</strong>,
    </p>

    <!-- Agradecimento -->
    <p style="margin: 0 0 18px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.7; color: #171717;">
      Met veel plezier bedanken wij u voor het accepteren van onze offerte
      en voor het kiezen van <strong>Santos Klussenbedrijf</strong> als uw
      dienstverlener.
    </p>

    <p style="margin: 0 0 20px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.7; color: #171717;">
      Wij waarderen het vertrouwen dat u in ons stelt. Wij zullen ons
      volledig inzetten om alle werkzaamheden uit de goedgekeurde offerte
      met de grootste zorg, verantwoordelijkheid en toewijding uit te voeren.
      Ons doel is om kwalitatief hoogwaardig werk te leveren en aan uw
      verwachtingen te voldoen.
    </p>

    <!-- Identificação da proposta aceita -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
           style="width: 100%; border-collapse: collapse; margin: 0 0 22px; font-family: Arial, Helvetica, sans-serif;">
      <tr>
        <td style="padding: 16px 18px; background-color: #f4f4f4; border-left: 4px solid #FF5F1F; font-family: Arial, Helvetica, sans-serif;">

          <p style="margin: 0 0 12px; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.5; font-weight: bold; color: #171717;">
            Gegevens van de geaccepteerde offerte
          </p>

          <p style="margin: 0 0 8px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.6; color: #444444;">
            <strong>Offertenummer:</strong>
            {{$dados->prc_id_prc}}
          </p>

          <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.6; color: #444444;">
            <strong>Datum van acceptatie:</strong>
            {{$carbon::parse($dados->prc_data_aceite)->format('d/m/Y')}}
          </p>

        </td>
      </tr>
    </table>

    <!-- Informações sobre o andamento dos trabalhos -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
           style="width: 100%; border-collapse: collapse; margin: 0 0 22px; font-family: Arial, Helvetica, sans-serif;">
      <tr>
        <td style="padding: 14px; background-color: #f4f4f4; border-left: 4px solid #FF5F1F; font-family: Arial, Helvetica, sans-serif;">

          <p style="margin: 0 0 8px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.6; font-weight: bold; color: #171717;">
            Vervolg van de werkzaamheden
          </p>

          <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.7; color: #333333;">
            De planning en startdatum van de werkzaamheden worden op een
            later moment in onderling overleg vastgesteld. Wij nemen contact
            met u op om een geschikte datum af te spreken, rekening houdend
            met de beschikbaarheid van beide partijen.
          </p>

        </td>
      </tr>
    </table>

    <!-- Compromisso com a qualidade -->
    <p style="margin: 0 0 18px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.7; color: #171717;">
      Wij voeren de werkzaamheden professioneel uit, met oog voor detail
      en respect voor de gemaakte afspraken. Duidelijke communicatie
      gedurende het hele proces vinden wij daarbij erg belangrijk.
    </p>

    <!-- Encerramento -->
    <p style="margin: 0 0 20px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.7; color: #171717;">
      Nogmaals hartelijk dank voor uw vertrouwen en voor de gelegenheid
      om dit project voor u uit te voeren. Wij kijken uit naar een prettige
      samenwerking en zullen ons uiterste best doen om u tevreden te stellen
      met het resultaat.
    </p>

    <!-- Assinatura -->
    <p style="margin: 0 0 5px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.7; color: #171717;">
      Met vriendelijke groet,
    </p>

    <p style="margin: 0 0 26px; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6; font-weight: bold; color: #FF5F1F;">
      Santos Klussenbedrijf
    </p>

  </td>
</tr>
