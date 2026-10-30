@inject('carbon', 'Carbon\Carbon')
<tr>
  <td style="padding: 30px 28px 10px; font-family: Arial, Helvetica, sans-serif; color: #171717;">

    <h2 style="margin: 0 0 8px; font-size: 23px; line-height: 1.4; color: #171717;">
      Betalingsbewijs / Kwitantie
    </h2>

    <p style="margin: 0 0 22px; font-size: 14px; line-height: 1.7; color: #666666;">
      Bewijs van ontvangst van betaling
    </p>

    <p style="margin: 0 0 18px; font-size: 14px; line-height: 1.7;">
      Beste <strong>{{$dados->cliente->cli_nome}}</strong>,
    </p>

    <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.7;">
      Hierbij bevestigen wij de ontvangst van de betaling voor de hieronder
      beschreven werkzaamheden.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
      border="0" style="width: 100%; border-collapse: collapse; margin: 0 0 22px;">

      <tr>
        <td style="padding: 12px 14px; background-color: #f4f4f4; border-left: 4px solid #FF5F1F;">

          <p style="margin: 0 0 8px; font-size: 14px; line-height: 1.5;">
            <strong>Naam klant:</strong> {{$dados->cliente->cli_nome}}
          </p>

          <p style="margin: 0 0 8px; font-size: 14px; line-height: 1.5;">
            @if(isset($data))
               <strong>Ontvangstdatum:</strong> {{$data}}
            @else
               <strong>Ontvangstdatum:</strong> {{$carbon::parse(now())->format('d/m/Y')}}
            @endif
          </p>

          <p style="margin: 0 0 8px; font-size: 14px; line-height: 1.5;">
            <strong>Betaalmethode:</strong> [Contant / Bankoverschrijving / Anders]
          </p>

          <p style="margin: 0; font-size: 14px; line-height: 1.5;">
            <strong>Referentie:</strong> Factuur Nº {{$dados->prc_id_prc}}
          </p>

        </td>
      </tr>
    </table>

    <h3 style="margin: 0 0 12px; font-size: 17px; line-height: 1.4; color: #171717;">
      Betalingsgegevens
    </h3>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
      border="0" style="width: 100%; border-collapse: collapse; font-size: 13px;">

      <tr style="background-color: #FF5F1F; color: #ffffff;">
        <th align="left" style="padding: 12px 10px; border: 1px solid #FF5F1F;">
          Omschrijving
        </th>
        <th align="right" style="padding: 12px 10px; border: 1px solid #FF5F1F; white-space: nowrap;">
          Bedrag
        </th>
      </tr>

      <tr>
        <td style="padding: 12px 10px; border: 1px solid #dddddd; line-height: 1.6;">
          Betaling voor uitgevoerde werkzaamheden
        </td>
        <td align="right" style="padding: 12px 10px; border: 1px solid #dddddd; white-space: nowrap;">
          € {{$dados->prc_valor_final}}
        </td>
      </tr>

      <tr style="background-color: #FF5F1F; color: #ffffff;">
        <td colspan="2" align="right"
          style="padding: 14px 10px; border: 1px solid #FF5F1F; font-size: 15px; font-weight: bold; white-space: nowrap;">
          TOTAAL ONTVANGEN:&nbsp;€&nbsp;{{$dados->prc_valor_final}}
        </td>
      </tr>

    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
      border="0" style="width: 100%; border-collapse: collapse; margin: 20px 0;">

      <tr>
        <td style="padding: 14px; background-color: #f4f4f4; border: 1px solid #e2e2e2;">

          <p style="margin: 0 0 8px; font-size: 14px; line-height: 1.6;">
            <strong>Verklaring van ontvangst</strong>
          </p>

          <p style="margin: 0; font-size: 13px; line-height: 1.7;">
            Santos Klussenbedrijf verklaart hierbij het hierboven vermelde
            bedrag te hebben ontvangen voor de beschreven werkzaamheden.
          </p>

        </td>
      </tr>
    </table>

    <p style="margin: 0 0 18px; font-size: 14px; line-height: 1.7;">
      Bewaar dit betalingsbewijs voor uw administratie.
    </p>

    <p style="margin: 0; font-size: 14px; line-height: 1.7;">
      Met vriendelijke groet,<br>
      <strong style="color: #FF5F1F;">Santos Klussenbedrijf</strong>
    </p>

  </td>
</tr>
