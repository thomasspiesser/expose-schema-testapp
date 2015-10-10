/**
 * Created by adrianhitulescu on 10/10/15.
 */
Meteor.startup(function() {
    if (Bookings.find().count()) {
        return;
    }

    Bookings.insert({
        customer: 'aaaaaaaaaaaaaaaaa',
        customerName: 'John Doe',
        transaction: '101',
        transactionDate: new Date(),
        amount: 1000,
        seats: 50,
        additionalCustomers: [],
        trainer: 'aaaaaaaaaaaaaaaaa',
        trainerName: 'Sylvester Stallone',
        course: 'aaaaaaaaaaaaaaaaa',
        courseTitle: 'Karate Kid for Beginners',
        courseFeePP: 100,
        eventId: 'aaaaaaaaaaaaaaaaa',
        eventDate: [new Date('1 December 2016 10:00')],
        eventConfirmed: false,
        billingAddress: 'Karatestr. 1, 10783, Berlin',
        bookingStatus: 'inProgress',
        paymentMethod: 'Kreditkarte',
        hasShared: false,
        coupon: {
            code: 'discount10',
            amount: '10'
        },
        createdAt: [new Date()],
        billingAddress: {
            firm: 'ABC GmbH',
            street: 'Doestr. 12',
        }
    })
})