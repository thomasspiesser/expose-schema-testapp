/**
 * Created by adrianhitulescu on 10/10/15.
 */
Meteor.startup(function() {
    if (Bookings.find().count()) {
        return;
    }
return;
    Bookings.insert({
        customer: new Mongo.Id,
        customerName: 'John Doe',
        transaction: '101',
        transactionDate: new Date(),
        amount: 1000,
        seats: 50,
        additionalCustomers: [],
        trainer: 'Mister Miyagi',
        course: 'karate-kid-level1',
        courseTitle: 'Karate Kid for Beginners',
        courseFeePP: 100,
        eventId: 'first-karate',
        eventDate: new Date('1 December 2016 10:00'),
        eventConfirmed: false,
        billingAddress: 'Karatestr. 1, 10783, Berlin',
        bookingStatus: 'inProgress',
        paymentMethod: 'Kreditkarte',
        hasShared: false,
        coupon: {
            code: 'discount10',
            amount: '10'
        },
        createdAt: new Date()
    })
})